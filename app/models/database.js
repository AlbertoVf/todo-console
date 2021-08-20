const fs = require('fs');
const file = './app/data/data.json';

const saveDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
    if (!fs.existsSync(file)) {
        return null;
    }
    const info = fs.readFileSync(file, { encoding: 'UTF-8' });

    return JSON.parse(info);
};

module.exports = { saveDB, readDB };
