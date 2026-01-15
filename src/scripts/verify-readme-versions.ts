import { readFile } from 'node:fs/promises';
import path from 'node:path';

const cwd = process.cwd();
const pkgPath = path.join(cwd, 'package.json');
const readmePath = path.join(cwd, 'README.md');

const pkg = JSON.parse(await readFile(pkgPath, 'utf8')) as {
    dependencies?: Record<string, string>;
};

const deps = pkg.dependencies ?? {};
const scopedDeps = Object.fromEntries(Object.entries(deps).filter(([name]) => name.startsWith('@axm-internal/')));

const readme = await readFile(readmePath, 'utf8');
const sectionHeader = '## Published Packages';
const start = readme.indexOf(sectionHeader);
if (start === -1) {
    throw new Error('README.md is missing the "## Published Packages" section.');
}

const sectionBody = readme.slice(start + sectionHeader.length);
const lines = sectionBody
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '));

const readmeMap = new Map<string, string>();
for (const line of lines) {
    const match = line.match(/^-[\s]+`([^`]+)`\s+—\s+`([^`]+)`/);
    if (match) {
        readmeMap.set(match[1], match[2]);
    }
}

const errors: string[] = [];

for (const [name, version] of Object.entries(scopedDeps)) {
    const readmeVersion = readmeMap.get(name);
    if (!readmeVersion) {
        errors.push(`Missing in README: ${name} (${version})`);
        continue;
    }
    if (readmeVersion !== version) {
        errors.push(`Version mismatch for ${name}: README=${readmeVersion}, package.json=${version}`);
    }
}

for (const name of readmeMap.keys()) {
    if (!(name in scopedDeps)) {
        errors.push(`README lists ${name} but it is not in package.json dependencies`);
    }
}

if (errors.length > 0) {
    console.error('Published Packages list is out of sync with package.json:');
    for (const error of errors) {
        console.error(`- ${error}`);
    }
    process.exit(1);
}

console.log('Published Packages list matches package.json.');
