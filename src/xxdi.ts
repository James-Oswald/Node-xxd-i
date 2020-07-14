import fs = require("fs");

function generateHeader(inputFileName:string, variableName:string|null, fileBuffer:Buffer):string{
    if(variableName == null)
        variableName = inputFileName.replace(/[/\\?%*:|"<>.]/g, '_')
    if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(variableName))
        throw new Error(`Illegal C identifier "${variableName}"`);
    let fileBufferBytes:Uint8Array = new Uint8Array(fileBuffer);
    let hexArray:string = "";
    for(let i:number = 0; i < fileBufferBytes.length; i++)
        hexArray += "0x" + fileBufferBytes[i].toString(16) + ",";
    hexArray = hexArray.slice(0, -1);
    return `const unsigned char ${variableName}[] = {${hexArray}};\nconst int ${variableName}_len = ${fileBufferBytes.length};`;
}

export function headerSync(inputFile:string, outputFile:string|null=null, variableName:string|null=null):string|undefined{
    let fileBuffer:Buffer = fs.readFileSync(inputFile);
    let header:string = generateHeader(inputFile, variableName, fileBuffer);
    if(outputFile != null)
        fs.writeFileSync(outputFile, header);
    return header;
}

export function header(inputFile:string, callback:(headerString:string)=>void=(s)=>{}, outputFile:string|null=null, variableName:string|null=null):void{
    fs.readFile(inputFile, function(err, fileBuffer){
        if(err != null)
            throw err;
        let header:string = generateHeader(inputFile, variableName, fileBuffer);
        if(outputFile != null)
            fs.writeFile(outputFile, header, function(){
                callback(header);
            });
        else
            callback(header);
        return;
    });
   
}
