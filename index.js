// Import dependencies
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

// relative path to the folder containing gifs
const GIFS_DIR = 'gifs';

// Window username
const windowsUser = os.userInfo().username;

// List gifs
const dirCont = fs.readdirSync(GIFS_DIR);
const gifs = dirCont.filter(f => f.match(/.*\.(gif?)/ig));

// Migrate gifs to Backgrounds with _thumb files.
gifs.forEach(g => {
    let renameFilename = g.replace('.gif', '.png');
    let renameFilenameThumb = g.replace('.gif', '_thumb.png');
    fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Roaming/Microsoft/Teams/Backgrounds/Uploads/${renameFilename}`);
    fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Roaming/Microsoft/Teams/Backgrounds/Uploads/${renameFilenameThumb}`);
    fs.unlinkSync(`${GIFS_DIR}/${g}`);
});

// Restart Teams (Kill and Restart)
exec(`Taskkill /IM Teams.exe /F; Start-Process -File $env:LOCALAPPDATA\\Microsoft\\Teams\\Update.exe -ArgumentList '--processStart "Teams.exe"'`, { 'shell': 'powershell.exe' });