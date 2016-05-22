const dietaryRequirements = {
  count: 6,
  dietaryRequirements: [
    {
      name: "Vegan",
      sortOrder: 0
    },
    {
      name: "Vegetarian",
      sortOrder: 1
    }
  ]
};

const packages = {
  data: {}
};

let component;

describe('searchresults component', () => {
  beforeEach(module('app'));

  beforeEach(inject(_$componentController_ => {
    component = _$componentController_('citypantrySearchresults');
  }));

  it('should retrieve the dietary information',
  angular.mock.inject($httpBackend => {
    $httpBackend.when('GET', 'https://api.citypantry.com/dietary-requirements')
        .respond(dietaryRequirements);

    $httpBackend.flush();

    expect(component.dietary[0].name)
      .to.equal(dietaryRequirements.dietaryRequirements[0].name);
    expect(component.dietary[0].sortOrder)
      .to.equal(dietaryRequirements.dietaryRequirements[0].sortOrder);
    expect(component.dietary[1].name)
      .to.equal(dietaryRequirements.dietaryRequirements[1].name);
    expect(component.dietary[1].sortOrder)
      .to.equal(dietaryRequirements.dietaryRequirements[1].sortOrder);
  }));

  describe('hould validate the form', () => {
    it('It shoud return false if the form is not valid', () => {
      expect(component.submit(false)).to.equal(false);
    });

    it('It shoud render a package image',
    angular.mock.inject($httpBackend => {
      $httpBackend.when('GET', 'https://api.citypantry.com/packages/100')
          .respond(packages);

      console.log(component);
      component.form.package.id = 100;
      $httpBackend.flush();
    }));
  });
});
