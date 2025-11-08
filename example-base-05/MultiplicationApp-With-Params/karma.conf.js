module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "public/**/*.html",
      "public/**/*.js",
      "test/**/*.spec.js",
    ],
    preprocessors: {
      "public/**/*.html": ["ng-html2js"],
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: "public/",
      moduleName: "templates",
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
