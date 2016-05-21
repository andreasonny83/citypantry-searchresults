angular
  .module('app')
  .component('citypantrySearchresults', {
    templateUrl: 'app/searchresults/searchresults.html',
    controller: SearchresultsController
  });

function SearchresultsController($http) {
  $http
    .get('app/searchresults/results.json')
    .then(response => {
      this.results = response.data;
    });
}
