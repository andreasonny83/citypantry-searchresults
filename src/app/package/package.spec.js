let component;

describe('package component', () => {
  beforeEach(angular.mock.module('app'));

  beforeEach(inject(_$componentController_ => {
    component = _$componentController_('citypantryPackage');
  }));

  it('should initialize the component', angular.mock.inject(() => {
    expect(component.isAvailable).to.equal(true);
    expect(component.isThinking).to.equal(true);
  }));

  describe('function: checkErrors', () => {
    it('should return an error if the user has not compile the required information', () => {
      component.package = {};
      expect(component.checkErrors()).to.equal(true);
    });

    it('should return false if all the minimum information are present', () => {
      component.headcount = 1;
      component.package = {
        minPeople: 1
      };

      expect(component.checkErrors()).to.equal(false);
    });
  });

  describe('function: refreshBudget - when the user provides a budget', () => {
    it('it should return the formatted budget from the client', () => {
      component.headcount = 3;
      component.budget = 21;

      expect(component.refreshBudget()).to.equal(6300);
    });
  });

  describe('function: refreshBudget - when the user does not provide any budget', () => {
    it('it should return the default package price', () => {
      component.headcount = 3;
      component.package = {pricePerPerson: 7.5};

      expect(component.refreshBudget()).to.equal(2250);
    });
  });
});
