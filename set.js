const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0RHM095RkNBSlRTUU5laFJZblJSaWNFaXVvLzhKRjI1NVJnY3J0U0NWcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWC9YTnVweFIwTEgyOHkvOFl6Y1JRdlhSYi9MaEFTTU41ZWcrQU5USy9YST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQml1RCtkUHFaZ1JIb3B4UFd0ZlNLUTdMYWIxTlhJMDBKTExKK1pMUW5ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJacXZIRUFzVDNadkRZN0c4bXk2Qi8wL0FUaEZnUHdqUjFGck9tcFNuTHdvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitHdlBDVXd5VllUMDFkb04vNyszQXR6aDZ5dnhOVGYvMFpKdkhmbStxWDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJCeG5KRjRjVnVudFVlalJWeXRXSGx4OGxZZ09vd0ZUUmxHQ0cxaFJ0Qjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUx5bG9zNUxmM0xhQUY4VHF0b2ZacGh3VVZUV1BwMElsa2xrUFhqQi9IMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkc1THFrRy9yUTVjQTlaNlV2Y0hBU2ovdjJsNGRBU091WHR5cGE4YittST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVSL3Q1bXBHbnFtSTJLYjh3QkV6cmdCZnJhMzh2ZzlUN2Z1TFRjL3pnaEwzd3VSWjQxSUVyQ3FBQUVvTmxVV2RwUEZTK1ZBZmJGblZteGdMb2hwWER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIwLCJhZHZTZWNyZXRLZXkiOiJXcUhoUnE4cFA1TzI3VEZPVklNb2NHQ1pwRkl5SXVmUnZneU1NUHFBblZ3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFR0ZXY2xhbVFRbVgwSU5iazh5ZTh3IiwicGhvbmVJZCI6ImIzYzIwNmYzLTU0YmUtNDU0My05NWY1LWE4YzQ5MjZlNzI5ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIraXM2RGg4WWh0Z2pETUYvWnVjbzJDVmxKUTQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGFlWGNGRno4RjNhOTRlYjV6MFAwQ2lscTNvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFZTVNYWVhGIiwibWUiOnsiaWQiOiIyNDM4NDk5NjI4NDg6NkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnlYOFpvSEVORFRyTGNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNHUwbW9yeFpUeXFBc0ZVTHZVYm9ZL3pKSHF3Uk5nSERvUDU2cVF5TWRUTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiKzlkSnV4SFdtWlpJa1ZobUtPVW9xajBrRlBDcE5iUXZtcEZrZFZuUDQ5ZzRYYUFMVEJIc29kb3BwRTk4REs1NjFXRFJkblB0N01VMXBhMEZwYStEQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik9jTUlmVm9nRWJWUzFEN1ZPRzkxZ3hXV2V3cnlaS2t4TXFaNXBvNGQzTE9xSmdDNjJ0dVNObUhPR1Y5Q0tQYnZndS9PR3l2ZVNRdDJFSGFRbWIxREJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQzODQ5OTYyODQ4OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZUx0SnFLOFdVOHFnTEJWQzcxRzZHUDh5UjZzRVRZQnc2RCtlcWtNakhVeiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNjY4NzcwOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPQW8ifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "GON FREECSS",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "242067274660",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'GON-FREECSS-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/WEaLzHn.jpeg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
