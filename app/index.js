const { inquirerMenu, pause, readInput } = require('./models/inquirer');
const Tareas = require('./models/tareas');
const { saveDB, readDB } = require('./models/database');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const db = readDB();

    if (db) {
        tareas.loadTareasArray(db);
    }
    await pause();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tareas.createTarea(desc);
                break;
            case '2':
                console.log(tareas.toArray);
                break;
            case '3':
                //todo: tareas completadas
                break;
            case '4':
                //todo: tareas pendientes
                break;
            case '5':
                //todo completar tareas
                break;
            case '6':
                //todo: borrar tareas
                break;
        }
        saveDB(tareas.toArray);
        await pause();
    } while (opt !== '0');
};

main();
