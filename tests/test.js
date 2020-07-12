const xxdi = require("../build/xxdi.js");

process.chdir(__dirname);
console.log(xxdi.headerSync("sample.txt"));
xxdi.headerSync("sample.jpg", "sample.h");