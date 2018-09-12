const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const rootPath = require('app-root-path') + '';
const chalk = require('chalk');

const MAX_PACKAGE_SIZE = 13312;

const distDir = path.join(rootPath, '/dist');
const packageName = 'game.zip';
const zipDir = path.join(rootPath, 'dist-zip');
const zipPath = path.join(zipDir, packageName);

if (!fs.existsSync(zipDir)) {
  fs.mkdirSync(zipDir);
}

const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

archive.pipe(output);
archive.directory(distDir, false);

output.on('close', () => {
  const packageSize = archive.pointer();
  printAvailableSizeLimit(packageSize);
});

archive.finalize();

function printAvailableSizeLimit(packageSize) {
  const freeSpacePercentage = Math.round(packageSize / MAX_PACKAGE_SIZE * 100 * 100) / 100;
  const chalkColor = freeSpacePercentage <= 80 ? 'green' : (freeSpacePercentage <= 100) ? 'yellow' : 'red';
  console.log(
    `Build zip file: ` +
    `${chalk.bold[chalkColor](`${packageSize} bytes`)} ` +
    `out of ${chalk.bold(`${MAX_PACKAGE_SIZE} bytes`)} ` +
    `(${chalk.bold[chalkColor](`${freeSpacePercentage}%`)}) ` +
    `(this is before advzip)`
  );
}
