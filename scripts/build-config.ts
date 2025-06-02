/**
 * This script is responsible for locating and loading the build configuration file (`build-config.js`)
 * used throughout the project. It searches recursively from the current working directory upward
 * until it finds the config file, then loads and exports its contents.
 *
 * License: MIT
 * Source: https://github.com/ant-design-blazor/ant-design-blazor/blob/master/LICENSE
 */

import { existsSync } from 'fs';
import { dirname, join, resolve } from 'path';

// Interface defining the expected structure of the build configuration
export interface BuildConfig {
  projectVersion: string;
  projectDir: string;
  componentsDir: string;
  scriptsDir: string;
  outputDir: string;
  publishDir: string;
  libDir: string;
}

const BUILD_CONFIG_FILENAME = 'build-config.js';

/**
 * Recursively searches upward from the current working directory to find the `build-config.js` file.
 * @returns The absolute path to the config file.
 * @throws Error if the config file is not found.
 */
export function findBuildConfig(): string {
  let currentDir = process.cwd();

  while (!existsSync(resolve(currentDir, BUILD_CONFIG_FILENAME))) {
    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error(`Cannot find ${BUILD_CONFIG_FILENAME} in any parent directory.`);
    }
    currentDir = parentDir;
  }

  return join(currentDir, BUILD_CONFIG_FILENAME);
}

// Resolve and load the build configuration
const buildConfigPath = findBuildConfig();
export const buildConfig = require(buildConfigPath) as BuildConfig;
