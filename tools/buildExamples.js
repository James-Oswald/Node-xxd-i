
//rebuild examples with latest version

const cp = require("child_process");

process.chdir("../examples");
cp.execSync("npm uninstall xxdi");
cp.execSync("npm install xxdi");