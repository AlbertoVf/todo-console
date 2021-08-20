const { inquirerMenu, pause, readInput, menuDelete, confirm, menuCheck } = require('./models/inquirer');
const TaskList = require('./models/tasks');
const { saveDB, readDB } = require('./models/database');

const main = async () => {
    let opt = '';
    const tasklist = new TaskList();
    const db = readDB();

    if (db) {
        tasklist.loadTaskArray(db);
    }
    await pause();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tasklist.createTask(desc);
                break;
            case '2':
                tasklist.listByCompleted(); // all
                break;
            case '3':
                tasklist.listByCompleted((state = 1)); // finished
                break;
            case '4':
                tasklist.listByCompleted((state = 2)); // not finished
                break;
            case '5':
                //todo completar tasklist
                const ids = await menuCheck(tasklist.toArray);
                tasklist.changeFinished(ids);
                break;
            case '6':
                const id = await menuDelete(tasklist.toArray);
                if (id !== '0') {
                    const ok = await confirm('Estas seguro de ue deseas borrarlo?');
                    if (ok) {
                        tasklist.deleteTask(id);
                        console.log('Tarea borrada');
                    } else {
                        console.log('No se ha borrado ninguna tarea');
                    }
                }
                break;
            default:
                console.log('Cerrando TODO'.yellow)
                break;
        }
        if (opt == '1' || opt == '5' || opt == '6') saveDB(tasklist.toArray);
        await pause();
    } while (opt !== '0');
};

main();
