"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = exports.headerSync = void 0;
const fs = require("fs");
function generateHeader(inputFileName, variableName, fileBuffer) {
    if (variableName == null)
        variableName = inputFileName.replace(/[/\\?%*:|"<>.]/g, '');
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(variableName))
        throw new Error(`Illegal C identifier "${variableName}"`);
    let fileBufferBytes = new Uint8Array(fileBuffer);
    let hexArray = "";
    for (let i = 0; i < fileBufferBytes.length; i++)
        hexArray += "0x" + fileBufferBytes[i] + ",";
    return `const char* ${variableName} = {${hexArray}};\nconst int ${variableName}_len = ${fileBufferBytes.length};`;
}
function headerSync(inputFile, outputFile = null, variableName = null) {
    let fileBuffer = fs.readFileSync(inputFile);
    let header = generateHeader(inputFile, variableName, fileBuffer);
    if (outputFile != null)
        fs.writeFileSync(outputFile, header);
    return header;
}
exports.headerSync = headerSync;
function header(inputFile, callback, outputFile = null, variableName = null) {
    fs.readFile(inputFile, function (err, fileBuffer) {
        if (err != null)
            throw err;
        let header = generateHeader(inputFile, variableName, fileBuffer);
        if (outputFile != null)
            fs.writeFile(outputFile, header, function () {
                callback(header);
            });
        else
            callback(header);
        return;
    });
}
exports.header = header;
