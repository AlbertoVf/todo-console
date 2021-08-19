const { inquirerMenu, pause, readInput } = require('./models/inquirer');
const TaskList = require('./models/tasks');
const { saveDB, readDB } = require('./models/database');

const main = async () => {
    let opt = '';
    const tasklist = new TaskList();
    const db = readDB();

    if (db) {
        tasklist.loadTareasArray(db);
    }
    await pause();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tasklist.createTarea(desc);
                break;
            case '2':
                tasklist.listAll();
                break;
            case '3':
                tasklist.listByCompleted((completed = true));
                break;
            case '4':
                tasklist.listByCompleted((completed = false));
                break;
            case '5':
                //todo completar tasklist
                break;
            case '6':
                //todo: borrar tasklist
                break;
        }
        saveDB(tasklist.toArray);
        await pause();
    } while (opt !== '0');
};

main();
