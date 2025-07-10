const HtmlReporter = require('nightwatch-html-reporter');
const path = require('path');

const reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: path.join(__dirname, 'nightwatch-html-report'),
  themeName: 'default',
  hideSuccess: false,
  relativeScreenshots: true,
  uniqueFilename: true,
  screenshots: {
    enabled: true,
    takeOnFails: true,
    takeOnSuccess: false,
    filename: (test) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      return `screenshot_${test.module}_${test.name}_${timestamp}.png`;
    },
    
    path: path.join(__dirname, 'nightwatch-html-report', 'screenshots')
  }
});

module.exports = {
  write: function(results, options, done) {
    // Custom reporter logic that includes screenshots
    done();
  },
  
  // Alternative: Use built-in HTML reporter with screenshot support
  reporter: 'html',
  output_folder: './nightwatch-html-report',
  theme: 'compact',
  launchReport: true,
  screenshots: {
    enabled: true,
    on_failure: true,
    on_error: true,
    path: function(screenshot) {
      return screenshot.filePath;
    }
  }
};
