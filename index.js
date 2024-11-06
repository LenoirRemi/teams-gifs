// Import dependencies
const fs = require('fs');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');

// Argument for using the Microsoft Teams classic flow
const classicTeams = process.argv.includes('--classic');

// Relative path to the folder containing gifs
const GIFS_DIR = 'gifs';

// Windows username
const windowsUser = os.userInfo().username;

// List gifs
const dirCont = fs.readdirSync(GIFS_DIR);
const gifs = dirCont.filter(f => f.match(/.*\.(gif?)/ig));

// Migrate gifs to Backgrounds with _thumb files.
if (classicTeams) {
    // Microsoft Teams classic
    gifs.forEach(g => {
        const renameFilename = g.replace('.gif', '.png');
        const renameFilenameThumb = g.replace('.gif', '_thumb.png');
        try {
            fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Roaming/Microsoft/Teams/Backgrounds/Uploads/${renameFilename}`);
            fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Roaming/Microsoft/Teams/Backgrounds/Uploads/${renameFilenameThumb}`);
            fs.unlinkSync(`${GIFS_DIR}/${g}`);
        } catch (error) { }
    });
} else {
    // Microsoft Teams new (2024)
    gifs.forEach(g => {
        const uuid = uuidv4();
        const renameFilename = `${uuid}.png`;
        const renameFilenameThumb = `${uuid}_thumb.png`;
        try {
            fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Local/Packages/MSTeams_8wekyb3d8bbwe/LocalCache/Microsoft/MSTeams/Backgrounds/Uploads/${renameFilename}`);
            fs.copyFileSync(`${GIFS_DIR}/${g}`, `C:/Users/${windowsUser}/AppData/Local/Packages/MSTeams_8wekyb3d8bbwe/LocalCache/Microsoft/MSTeams/Backgrounds/Uploads/${renameFilenameThumb}`);
            fs.unlinkSync(`${GIFS_DIR}/${g}`);
        } catch (error) { }
    });
}

// Restart Teams (Kill and Restart)
if (classicTeams) {
    // Microsoft Teams classic
    exec(`Taskkill /IM Teams.exe /F; Start-Process -File $env:LOCALAPPDATA\\Microsoft\\Teams\\Update.exe -ArgumentList '--processStart "Teams.exe"'`, { shell: 'powershell.exe' });
} else {
    // Microsoft Teams new (2024)
    exec(`Taskkill /IM ms-teams.exe /F; Start-Process ms-teams.exe`, { shell: 'powershell.exe' });
}
