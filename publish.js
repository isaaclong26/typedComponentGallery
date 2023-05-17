const fs = require('fs-extra');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, 'package.json');
const srcDir = path.resolve(__dirname, 'src/assets');
const destDir = path.resolve(__dirname, 'dist/assets');

// Read the package.json file
fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading package.json:', err);
    return;
  }

  // Parse the content
  const packageJson = JSON.parse(data);

  // Increment the version
  const [major, minor, patch] = packageJson.version.split('.').map(Number);
  const newVersion = `${major}.${minor}.${patch + 1}`;

  // Update the version in the parsed object
  packageJson.version = newVersion;

  // Write the updated content back to package.json
  fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) {
      console.error('Error writing package.json:', err);
      return;
    }

    console.log('Version updated to:', newVersion);

    // Copy the assets directory
    fs.copy(srcDir, destDir, (err) => {
      if (err) {
        console.error('Error copying assets:', err);
        return;
      }

      console.log('Assets copied successfully');
    });
  });
});
