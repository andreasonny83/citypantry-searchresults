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

const defaultPackages = [
  {id: 3787},
  {id: 3353},
  {id: 2104},
  {id: 913},
  {id: 6595},
  {id: 4767},
  {id: 3326}
];

const packages = {
  package: {
    items: [{
      name: 'item1'
    }],
    images: [{
      medium: 'url/to/image'
    }]
  }
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

  it('should contains a list of valid packages id', () => {
    expect(component.packages[0].id).to.equal(defaultPackages[0].id);
    expect(component.packages[1].id).to.equal(defaultPackages[1].id);
    expect(component.packages[2].id).to.equal(defaultPackages[2].id);
    expect(component.packages[3].id).to.equal(defaultPackages[3].id);
    expect(component.packages[4].id).to.equal(defaultPackages[4].id);
    expect(component.packages[5].id).to.equal(defaultPackages[5].id);
    expect(component.packages[6].id).to.equal(defaultPackages[6].id);
  });

  describe('should validate the form', () => {
    beforeEach(inject($httpBackend => {
      $httpBackend.when('GET', 'https://api.citypantry.com/dietary-requirements')
          .respond(dietaryRequirements);

      $httpBackend.when('GET', 'https://api.citypantry.com/packages/100')
          .respond(packages);
      component.form = {package: {id: 100}};
    }));

    it('It shoud return false if the form is not valid', () => {
      expect(component.submit(false)).to.equal(false);
    });

    it('It shoud render a package image',
    angular.mock.inject($httpBackend => {
      component.submit(true);

      $httpBackend.flush();

      expect(component.packagePic)
        .to.equal(packages.package.images[0].medium);
    }));

    it('And set `result` to an array of items',
    angular.mock.inject($httpBackend => {
      component.submit(true);

      $httpBackend.flush();

      expect(component.result.items[0].name)
        .to.equal(packages.package.items[0].name);
    }));
  });
});
