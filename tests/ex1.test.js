let xxdi = require("../build/xxdi.js");
process.chdir(__dirname);

//log header text sync
console.log(`sync, default var name:\n${ xxdi.headerSync("helloWorld.txt") }\n`);

//log header text async
xxdi.header("helloWorld.txt", (s)=>{console.log(`async, default var name:\n${ s }\n`);});

//log header text, custom C variable name sync
console.log(`sync, custom var name:\n${ xxdi.headerSync("helloWorld.txt", null, "hello") }\n`);

//log header text, custom C variable name async
xxdi.header("helloWorld.txt", (s)=>{console.log(`async, custom var name:\n${ s }\n`);}, null, "hello");

//create header with custom C var name file sync 
xxdi.headerSync("helloWorld.txt", "helloWorld.h", "hello");

//create header with custom C var name file async 
xxdi.header("helloWorld.txt", (s)=>{}, "helloWorld.h", "hello");