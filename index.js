const fs = require('fs');
const os = require('os');

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

console.log("Now Quit and Restart your Teams.");