const fs = require('fs');
const os = require('os');

// var spawn = require("child_process").spawn, child;
// child = spawn("powershell.exe", ["c:\\temp\\helloworld.ps1"]);
// child.stdout.on("data", function (data) {
//     console.log("Powershell Data: " + data);
// });
// child.stderr.on("data", function (data) {
//     console.log("Powershell Errors: " + data);
// });
// child.on("exit", function () {
//     console.log("Powershell Script finished");
// });
// child.stdin.end();

const { exec } = require('child_process');


const GIFS_DIR = 'gifs';

var windowsUser = os.userInfo().username;

const dirCont = fs.readdirSync(GIFS_DIR);
const gifs = dirCont.filter(f => f.match(/.*\.(gif?)/ig));

gifs.forEach(g => {
    let renameFilename = g.replace('.gif', '.png');
    let renameFilenameThumb = g.replace('.gif', '_thumb.png');
    fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Roaming/Microsoft/Teams/Backgrounds/Uploads/${renameFilename}`);
    fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Roaming/Microsoft/Teams/Backgrounds/Uploads/${renameFilenameThumb}`);
    fs.unlinkSync(`${GIFS_DIR}/${g}`);
});

exec('Taskkill /IM Teams.exe /F', { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
    exec(`Start-Process -File $env:LOCALAPPDATA\\Microsoft\\Teams\\Update.exe -ArgumentList '--processStart "Teams.exe"'`, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => { });
});