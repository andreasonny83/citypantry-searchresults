describe('header component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('citypantryHeader', () => {
      return {
        templateUrl: 'app/header/header.html'
      };
    });
  }));

  it('should render the header', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<citypantry-header></citypantry-header>')($rootScope);
    $rootScope.$digest();
    const header = element.find('a');
    expect(header.html().trim()).to.equal('City Pantry');
  }));
});
