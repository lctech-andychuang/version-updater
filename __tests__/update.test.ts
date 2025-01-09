// __tests__/update.test.ts
import * as fs from 'fs'; // Import the fs module (not just fs.promises)
import * as core from '@actions/core';
import { updateVersion } from '../src'; // Import the function you want to test

// Mocking package.json version using jest mock
jest.mock('../package.json', () => ({
  version: '1.0.0'
}), { virtual: true });

// Mock fs module methods
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
    access: jest.fn(),
  },
  readFileSync: jest.fn(),
  existsSync: jest.fn(),
  writeFileSync: jest.fn()
}));

// Mock core methods
jest.mock('@actions/core', () => ({
  setFailed: jest.fn(),
  setOutput: jest.fn(),
  info: jest.fn(),
}));

describe('updateVersion', () => {
  it('should update the patch version in package.json', async () => {
    // Mock the behavior of fs methods and package.json
    const mockPackageJson = { version: '1.0.0' };

    // Mock fs.existsSync to return true (package.json exists)
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    // Mock fs.readFileSync to return mock package.json content
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockPackageJson));

    // Mock fs.promises methods
    (fs.promises.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

    // Run the updateVersion function
    console.log('Before running updateVersion');
    await updateVersion();
    console.log('After running updateVersion');

    // Check that the version was updated
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      'package.json',
      JSON.stringify({ version: '1.0.1' }, null, 2)
    );
  });
});
