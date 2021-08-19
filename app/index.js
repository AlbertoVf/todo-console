const { inquirerMenu, pause, readInput } = require('./models/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    do {
        opt = await inquirerMenu();
        console.log(opt);
        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tareas.createTarea(desc);
                break;
            case '2':
                //todo: listaer tareas
                console.log(tareas._listado);
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
        await pause();
    } while (opt !== '0');
};

main();
