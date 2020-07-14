const xxdi = require("../build/xxdi.js");

process.chdir(__dirname);
console.log(xxdi.headerSync("sample.txt"));
xxdi.headerSync("sample.jpg", "sample.h");
xxdi.header("sample.txt", (h)=>console.log(h));
xxdi.header("sample.jpg", (s)=>{}, "sample2.h");