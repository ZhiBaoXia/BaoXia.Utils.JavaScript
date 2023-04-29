const fs = require('fs');
const path = require('path');

const sourceDir = '/';
const targetDir = 'dist';

// 复制 .ts 文件
fs.readdirSync(sourceDir)
    .filter(file => path.extname(file) === '.ts')
    .forEach(file =>
    {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        fs.copyFileSync(sourcePath, targetPath);
    });