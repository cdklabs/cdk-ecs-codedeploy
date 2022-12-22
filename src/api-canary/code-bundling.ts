import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { BundlingOptions, ILocalBundling } from 'aws-cdk-lib';

const PACKAGE_JSON_PATTERN = /^package\.json$/;
const SOURCE_JS_PATTERN = /^.+\.js$/;

export class CanaryCodeBundler implements ILocalBundling {
  constructor(readonly codePath: string) {
    const codePathStats = fs.lstatSync(this.codePath);
    if (!codePathStats.isDirectory) {
      throw new Error(`Invalid codePath: ${this.codePath}`);
    }
  }

  copy(pattern: RegExp, outputDir: string) {
    const outputDirStats = fs.lstatSync(outputDir);
    if (!outputDirStats.isDirectory) {
      throw new Error(`Invalid outputDir: ${outputDir}`);
    }
    fs.readdirSync(this.codePath)
      .filter(f => f.match(pattern))
      .forEach(f => {
        fs.copyFileSync(`${this.codePath}/${f}`, `${outputDir}/${f}`);
      });
  }

  tryBundle(outputDir: string, _options: BundlingOptions): boolean {
    fs.mkdirSync(`${outputDir}/nodejs`);

    this.copy(PACKAGE_JSON_PATTERN, `${outputDir}/nodejs`);

    execSync('npm install', { cwd: `${outputDir}/nodejs` });

    this.copy(SOURCE_JS_PATTERN, `${outputDir}/nodejs/node_modules`);

    return true;
  }

  toJSON(): object {
    return {
      codePath: path.relative(__dirname, this.codePath),
    };
  }
}
