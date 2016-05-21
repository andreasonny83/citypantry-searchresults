angular
  .module('app')
  .component('citypantrySearch', {
    templateUrl: 'app/searchresults/search.html',
    bindings: {
      result: '<'
    }
  });
