import fs from 'fs';
import path from 'path';

// 复制文件夹不包括文件夹本身
function copyFolder(sourcePath, destinationPath) {
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }

  const files = fs.readdirSync(sourcePath);
  files.forEach((file) => {
    const sourceFile = path.join(sourcePath, file);
    const destFile = path.join(destinationPath, file);
    if (fs.lstatSync(sourceFile).isDirectory()) {
      copyFolder(sourceFile, destFile);
    } else {
      fs.copyFileSync(sourceFile, destFile);
    }
  });
}

// !!!
copyFolder('./src', './dist/src');
// !!!