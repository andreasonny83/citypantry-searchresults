angular.module('app')
  .component('citypantrySearchresults', {
    bindings: {
      form: '<'
    },
    templateUrl: 'app/searchresults/searchresults.html',
    controller: SearchresultsController
  });

function SearchresultsController($scope, $http) {
  const vm = this;
  vm.packages = [
    {id: 3787},
    {id: 3353},
    {id: 2104},
    {id: 913},
    {id: 6595},
    {id: 4767},
    {id: 3326}
  ];

  function submit(isValid) {
    if (!isValid) {
      return false;
    }

    $http.get(
      [
        'https://api.citypantry.com/packages/',
        vm.form.package.id
      ].join('')
      ).then(response => {
        vm.packagePic = response.data &&
            response.data.package &&
            response.data.package.images &&
            response.data.package.images[0].medium ?
            response.data.package.images[0].medium :
            null;
        vm.result = response.data &&
            response.data.package ?
            response.data.package :
            null;
        console.log(vm);
      });
  }

  function _init() {
    $http.get('https://api.citypantry.com/dietary-requirements')
      .then(response => {
        vm.dietary = response.data.dietaryRequirements;
      });
  }

  vm.submit = submit;

  _init();
}
