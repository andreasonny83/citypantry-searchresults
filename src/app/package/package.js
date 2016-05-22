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

    return Math.floor(budget * vm.headcount * 100);
  }

  function scanDietaris(products) {
    let item;
    let person;
    let options;
    let option;
    let diet;
    const dietary = {remaining: 0};
    let dietaryChoice;
    let sortOrder;

    vm.dietarySize = 0;

    if (vm.dietary) {
      for (diet in vm.dietary) {
        if (vm.dietary.hasOwnProperty(diet)) {
          dietary[Math.floor(diet) + 1] = vm.dietary[diet];
          vm.dietarySize += vm.dietary[diet];
          dietary.remaining += vm.dietary[diet];
        }
      }
    }

    // if thre are no dietary requirements, move on.
    if (!vm.dietarySize) {
      return;
    }

    for (item in products) {
      if (!products.hasOwnProperty(item) ||
      !products[item].item.hasOwnProperty('options')) {
        continue;
      }

      options = products[item].item.options;

      // skip this option only if the user specied dietary requirements
      // and the selecte option doesn't have any information about it.
      for (option in options) {
        if (!options.hasOwnProperty(option) ||
            (!options[option].dietaryRequirements && vm.dietarySize)) {
          continue;
        }

        if (!options[option].hasOwnProperty('count')) {
          options[option].count = 0;
        }

        for (person = 0; person < vm.headcount; person++) {
          // find dietary requirements
          if (dietary.remaining) {
            for (dietaryChoice in options[option].dietaryRequirements) {
              if (!options[option].dietaryRequirements.hasOwnProperty(dietaryChoice)) {
                continue;
              }

              sortOrder = options[option]
                  .dietaryRequirements[dietaryChoice].sortOrder;

              if (vm.availableBudget >= Math.floor(products[item].price * 100) &&
                  dietary[sortOrder] > 0) {
                options[option].count += 1;
                dietary[sortOrder] -= 1;
                dietary.remaining -= 1;
                vm.availableBudget -= Math.floor(
                    products[item].price * 100
                  );
              }
            }
          }
        }
      }
    }
  }

  function scanNonDietaris(products) {
    console.log('vm.availableBudget', vm.availableBudget);
    let item;
    let options;
    let option;

    vm.dietarySize = vm.dietarySize || 0;
    console.log('vm.dietarySize', vm.dietarySize);

    for (item in products) {
      if (!products.hasOwnProperty(item) ||
      !products[item].item.hasOwnProperty('options')) {
        continue;
      }

      options = products[item].item.options;

      for (option in options) {
        if (!options.hasOwnProperty(option)) {
          continue;
        }

        if (vm.availableBudget >= Math.floor(products[item].price * 100)) {
          options[option].count = options[option].count ?
          options[option].count += (vm.headcount - vm.dietarySize) :
          vm.headcount - vm.dietarySize;

          vm.availableBudget -= Math.floor(
              products[item].price * (vm.headcount - vm.dietarySize) * 100
            );
        }
      }
    }
  }

  function renderItems(items) {
    let item;
    // let person;

    for (item in items) {
      if (!items.hasOwnProperty(item)) {
        continue;
      }

      // store upgrades in a different array
      if (items[item].isUpgrade) {
        vm.upgrades.push(items[item]);
        continue;
      }

      vm.products.push(items[item]);
    }
  }

  function refresh() {
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

    // reset arrays for displaying results
    vm.products = [];
    vm.upgrades = [];

    vm.availableBudget = refreshBudget();

    renderItems(vm.package.packageItems);
    scanDietaris(vm.products);
    scanNonDietaris(vm.products);

    vm.isAvailable = true;
  }

  this.$onChanges = function () {
    refresh();
  };

  function _init() {
    vm.products = [];
    vm.upgrades = [];
    vm.error = {};
    vm.isAvailable = true;
    vm.isThinking = true;
    vm.availableBudget = 0;
  }

  vm.refreshBudget = refreshBudget;
  vm.checkErrors = checkErrors;

  _init();
}
