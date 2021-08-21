const { todoMenu, pause, readInput, deleteMenu, confirm, checkMenu, modifyMenu } = require('./app/models/inquirer');
const TaskList = require('./app/models/tasks');
const { saveDB, readDB } = require('./app/models/database');

const main = async () => {
    let opt = '';
    let id = '';
    const tasklist = new TaskList();
    const db = readDB();

    if (db) tasklist.loadTaskArray(db);

    await pause();
    do {
        opt = await todoMenu();
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
                const ids = await checkMenu(tasklist.toArray);
                tasklist.changeFinished(ids);
                break;
            case '6':
                id = await deleteMenu(tasklist.toArray);
                if (id !== '0') {
                    const ok = await confirm('Estas seguro de que deseas borrarlo?');
                    if (ok) {
                        tasklist.deleteTask(id);
                        console.log('Tarea borrada');
                    } else {
                        console.log('No se ha borrado ninguna tarea');
                    }
                }
                break;
            case '7':
                id = await modifyMenu(tasklist.toArray);
                if (id !== '0') {
                    const ok = await confirm('Estas seguro de que deseas modificar?');
                    if (ok) {
                        tasklist.changeDescription(id, await readInput('Descripcion: '));
                        console.log('Tarea Modificada');
                    } else {
                        console.log('No se ha modificado ninguna tarea');
                    }
                }
            default:
                console.log('Cerrando'.yellow);
                break;
        }
        if (opt == '1' || opt == '5' || opt == '6') saveDB(tasklist.toArray);
        await pause();
    } while (opt !== '0');
};

main();
