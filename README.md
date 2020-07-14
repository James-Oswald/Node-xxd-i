# Node-xxdi
A node module that preforms the function of the bash command "xxd -i". 

## Background
In trying to reduce tooling dependancies for my [Lightweight Jar to Exe program](https://github.com/James-Oswald/Lightweight-Jar-To-Exe), I developed this package to
remove the need for the command "xxd -i" on path which would need MSYS or other alternitives to have on path. 

## Install 
Set registry as
```https://npm.pkg.github.com/@james-oswald```
then run
```npm i xxdi```

## Useage
This module exposes two funtions:
```ts
header(inputFileName: string, callback: (headerText: string) => void, outputFileName: string, variableName: string): void
``` 
Asynchronously generates the .h file, `callback` can be used to get the text contents of the .h file, if `outputFileName` is provided, will atomatically generate the .h file on the given path. 
and
```ts
headerSync(inputFileName: string, outputFilename: string, variableName: string): string
```
Synchronously generates the .h file. If `outputFileName` is provided, will atomatically generate the .h file on the given path. 

### parameters
`inputFileName` is the path to the file to be converted to a C hexdump header  
`callback` is the callback from `header` with the header's text passed in as `headerText`  
`outputFileName` is the path to the output .h file, `null` by default, if `null`, no file is created and the headers text will be passed to the callback or returned in the sync case.  
`variableName` is the name of the C/C++ const char* variable in the .h file, if unprovided will be a legal version of the `inputFileName`, if the name provided is an illegal C idenifyer, an exception will be thrown.   

## Sample code
Found in `/examples/`
helloWorld.txt
```txt
Hello World!
```
index.js
```js
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
```
console output
```txt
const char helloWorldtxt[]={0x48,0x65,0x6c,0x6c,0x6f,0x20,0x57,0x6f,0x72,0x6c,0x64,0x21};
const int helloWorldtxt_len = 12;
const char hello[]={0x48,0x65,0x6c,0x6c,0x6f,0x20,0x57,0x6f,0x72,0x6c,0x64,0x21};
const int hello_len = 12;
const char helloWorldtxt[]={0x48,0x65,0x6c,0x6c,0x6f,0x20,0x57,0x6f,0x72,0x6c,0x64,0x21};
const int helloWorldtxt_len = 12;
const char helloWorldtxt[]={0x48,0x65,0x6c,0x6c,0x6f,0x20,0x57,0x6f,0x72,0x6c,0x64,0x21};
const int helloWorldtxt_len = 12;
```
helloWorld.h
```c
const char hello[]={0x48,0x65,0x6c,0x6c,0x6f,0x20,0x57,0x6f,0x72,0x6c,0x64,0x21};
const int hello_len = 12;
```


