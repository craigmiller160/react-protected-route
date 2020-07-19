const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const libPath = path.resolve(cwd, 'lib');

if (fs.existsSync(libPath)) {
    fs.rmdirSync(libPath, { recursive: true });
}
