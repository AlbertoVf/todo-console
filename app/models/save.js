const fs = require('fs');
const file = './app/data/data.json';

const saveDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
};

module.exports = { saveDB };
