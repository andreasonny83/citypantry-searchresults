angular.module('app')
  .component('citypantryPackage', {
    templateUrl: 'app/package/package.html',
    bindings: {
      package: '<',
      pic: '<',
      headcount: '<',
      budget: '<',
      dietary: '<'
    },
    controller: PackageController
  });

function PackageController() {
  const vm = this;

  /**
   * make sure the form contains valid information
   * before proceding.
   *
   * @return {Boolean}  Return false if there are no errors.
   */
  function checkErrors() {
    let containsErrors;

    if (!vm.package.minPeople ||
        !vm.headcount ||
        vm.headcount < vm.package.minPeople) {
      vm.isAvailable = false;
      vm.error.headcount = true;
      vm.error.minPeople = vm.package.minPeople;
      containsErrors = !0;
    } else {
      containsErrors = !1;
    }

    return containsErrors;
  }

  /**
   * Refresh the available budged based on the
   * number of people and the budget per person, if available.
   *
   * @return {Int}   Return the available budget.
   */
  function refreshBudget() {
    const budget = vm.budget ?
      vm.budget :
      vm.package.pricePerPerson;

    return budget * vm.headcount;
  }

  function refresh() {
    let person;
    let item;
    vm.products = [];
    vm.error = {};

    console.log('thinking...');

    if (!vm.package ||
        !vm.package.packageItems ||
        !vm.package.packageItems.length) {
      return;
    }

    if (checkErrors()) {
      return;
    }

    vm.isAvailable = true;
    vm.availableBudget = refreshBudget();
    console.log(vm.products);

    for (item = 0; item < vm.package.packageItems.length; item++) {
      // skip upgrades
      if (vm.package.packageItems[item].isUpgrade) {
        continue;
      }

      vm.products.push(vm.package.packageItems[item]);
      vm.products[item].count = 0;

      if (vm.availableBudget >= vm.package.packageItems[item].price) {
        for (person = 0; person < vm.headcount; person++) {
          console.log(vm.products[item]);
          vm.products[item].count = vm.products[item].count ?
              vm.products[item].count += 1 :
              1;

          // vm.availableBudget -= vm.package.packageItems[item].price;
        }
      }
    }
  }

  this.$onChanges = function () {
    refresh();
  };

  function _init() {
    vm.products = [];
    vm.error = {};
    vm.isAvailable = true;
    vm.availableBudget = 0;
  }

  vm.refreshBudget = refreshBudget;

  _init();
}
