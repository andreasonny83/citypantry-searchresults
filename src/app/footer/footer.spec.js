describe('footer component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('citypantryFooter', () => {
      return {
        templateUrl: 'app/footer.html'
      };
    });
  }));
  beforeEach(angular.mock.module('app'));
  it('should render \'the GitHub link\'', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<citypantry-footer></citypantry-footer>')($rootScope);
    $rootScope.$digest();
    const footer = element.find('a');
    expect(footer.html().trim()).to.equal('andreasonny83');
  }));
});
