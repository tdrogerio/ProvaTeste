module.exports = function (config) {
  config.set({
    reporters: ['progress', 'kjhtml', 'junit'],
    junitReporter: {
      outputDir: 'coverage',  // Save test report in the coverage folder
      outputFile: 'test-report.xml',
      useBrowserName: false
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
