// spec.js
describe('Starting the app', function() {
  describe('Going to the City Pantry homepage', function() {
    it('should have a title', function() {
      browser.get('http://sonnywebdesign.com/citypantry');

      expect(browser.getTitle()).toEqual('City Pantry');
    });

    it('and it should render a package', function() {
      browser.get('http://sonnywebdesign.com/citypantry');

      element(by.name('package')).click();
      element(by.name('package')).sendKeys('3787');

      element(by.name('headcount')).click();
      element(by.name('headcount')).sendKeys('3');

      element(by.name('submit')).click();

      browser.driver.sleep(2000);
    });
  });
});
