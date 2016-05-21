describe('main component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('citypantryHeaderDirective', () => {
      return {};
    });
  }));

  beforeEach(module('app', $provide => {
    $provide.factory('citypantryTitleDirective', () => {
      return {};
    });
  }));

  beforeEach(module('app', $provide => {
    $provide.factory('citypantrySearchresultsDirective', () => {
      return {};
    });
  }));

  beforeEach(module('app', $provide => {
    $provide.factory('citypantryFooterDirective', () => {
      return {};
    });
  }));

  it('should render the header, title, content and footer', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<app>Loading...</app>')($rootScope);
    $rootScope.$digest();
    expect(element.find('citypantry-header').length).to.equal(1);
    expect(element.find('citypantry-title').length).to.equal(1);
    expect(element.find('citypantry-searchresults').length).to.equal(1);
    expect(element.find('citypantry-footer').length).to.equal(1);
  }));
});
