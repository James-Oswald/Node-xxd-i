let xxdi = require("xxdi");

//log header text sync
console.log(xxdi.headerSync("helloWorld.txt"));

//log header text async
xxdi.header("helloWorld.txt", (s)=>{console.log(s);});

//log header text, custom C variable name sync
console.log(xxdi.headerSync("helloWorld.txt", null, "hello"));

//log header text, custom C variable name async
xxdi.header("helloWorld.txt", (s)=>{console.log(s);}, "hello");

//create header with custom C var name file sync 
xxdi.headerSync("helloWorld.txt", "helloWorld.h", "hello");

//create header with custom C var name file async 
xxdi.header("helloWorld.txt", (s)=>{}, "helloWorld.h", "hello");