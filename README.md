# CityPantry [searchresults module]

> Demo searchresults component

Live version available [here](http://sonnywebdesign.com/citypantry/)

## Getting Started

### Download / Clone

Clone the repo using Git:

```bash
git clone https://github.com/andreasonny83/citypantry-searchresults.git
```

Alternatively you can [download](https://github.com/andreasonny83/citypantry-searchresults/archive/master.zip)
this repository.

### Build

To render the app in your browser, first install the necessary
dependencies, from the root of the project:

```bash
npm install && npm install -g gulp && bower install
```

Next, run the following one-liner to compile the component
into a local instance of the app:

```bash
gulp serve
```

### Unit tests

All the unit test can be triggered using the following gulp task:

```bash
gulp test
```

### E2E tests

There is a gulp protractor task in WIP. At this moment you can only run the End 2 End using `protractor` and `webdriver`

#### 1.
Use npm to install Protractor globally with:

    `npm install -g protractor`

#### 2.
This will install two command line tools, protractor and webdriver-manager. Try running protractor --version to make sure it's working.

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

    webdriver-manager update

Now start up a server with:

    webdriver-manager start

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at http://localhost:4444/wd/hub.

#### 3.
Run the E2E test from the root project folder with:

    protractor e2e/protractor.config.js


## License

MIT © [Andrea Sonny](https://github.com/andreasonny83)
