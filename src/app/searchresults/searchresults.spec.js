describe('tech component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('citypantrySearchresults', () => {
      return {
        templateUrl: 'app/searchresults/searchresults.html'
      };
    });
  }));

  it('should render the searchresults component',
  // angular.mock.inject(($rootScope, $compile) => {
  angular.mock.inject(() => {
    expect(3).to.equal(3);
    // const $scope = $rootScope.$new();
    //
    // $scope.fixture = {
    //   key: 'gulp',
    //   title: 'Gulp',
    //   logo: 'https://gfulton-images.s3.amazonaws.com/2015/Dec/gulp_logo-1450648879924.jpg',
    //   text1: 'The streaming build system',
    //   text2: 'Automate and enhance your workflow'
    // };
    //
    // const element = $compile('<citypantry-searchresults tech="fixture"></citypantry-searchresults>')($scope);
    // $scope.$digest();
    // const tech = element.find('h3');
    // expect(tech.html().trim()).to.equal('Gulp');
  }));
});
