const fs = require('fs');
const path = require('path');

/**
 * Clean test results script
 * Deletes test_output, screenshots, and nightwatch-html-report directories
 */

function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    try {
      fs.rmSync(directoryPath, { recursive: true, force: true });
      console.log(`✅ Cleaned: ${directoryPath}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to clean ${directoryPath}:`, error.message);
      return false;
    }
  } else {
    console.log(`ℹ️  Directory doesn't exist: ${directoryPath}`);
    return true;
  }
}

function cleanTestResults() {
  console.log('🧹 Starting test results cleanup...');
  
  const dirsToClean = [
    './tests_output',
    './screenshots', 
    './nightwatch-html-report'
  ];
  
  let allCleaned = true;
  
  dirsToClean.forEach(dir => {
    const result = deleteFolderRecursive(dir);
    if (!result) allCleaned = false;
  });
  
  if (allCleaned) {
    console.log('✅ All test results cleaned successfully!');
  } else {
    console.log('⚠️  Some directories could not be cleaned');
    process.exit(1);
  }
}

// Run cleanup if this script is executed directly
if (require.main === module) {
  cleanTestResults();
}

module.exports = { cleanTestResults };
