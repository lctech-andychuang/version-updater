import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core'; // Import core library for GitHub Actions

// 🎨 **Utility Functions**
function error(message: string): void {
    core.setFailed(message);  // Using core.setFailed for error handling in GitHub Actions
}

// 🚀 **Update Version**
export async function updateVersion(): Promise<void> {
    const packageJsonPath = path.resolve('package.json');
    if (!fs.existsSync(packageJsonPath)) {
        error('package.json not found.');
    }

    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    if (!packageData.version) {
        error('No version field in package.json');
    }

    const versionParts = packageData.version.split('.').map(Number);
    if (versionParts.length !== 3 || versionParts.some(isNaN)) {
        error('Invalid version format in package.json');
    }

    versionParts[2] += 1;  // Update the patch version
    const newVersion = versionParts.join('.');

    core.info(`🐥 Version updated: ${packageData.version} → ${newVersion}`);

    packageData.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));

    // Set the output TAG_VERSION for later steps in the workflow
    core.setOutput('TAG_VERSION', newVersion);  // Set output for GitHub Actions
}

// Main execution
updateVersion().catch(error);
