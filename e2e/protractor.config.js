// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumServerJar: './node_modules/selenium-standalone-jar/bin/selenium-server-standalone-2.45.0.jar',
  specs: ['specs/spec.js']
};
