describe('title component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('citypantryTitle', () => {
      return {
        templateUrl: 'app/title.html'
      };
    });
  }));
  beforeEach(angular.mock.module('app'));
  it('should render the title', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<citypantry-title></citypantry-title>')($rootScope);
    $rootScope.$digest();
    const title = element.find('h1');
    expect(title.html().trim()).to.equal('&lt;searchresults&gt;');
  }));
});
