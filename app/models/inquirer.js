const inquirer = require('inquirer');
require('colors');

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`,
        },
    ];
    console.log('\n');
    await inquirer.prompt(question);
};

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            },
        },
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
};

const confirm = async (message) => {
    const question = [{ type: 'confirm', name: 'ok', message }];
    const { ok } = await inquirer.prompt(question);
    return ok;
};

const todoMenu = async () => {
    const questions = [
        {
            type: 'list',
            name: 'option',
            message: 'Selecciona una opcion',
            choices: [
                { value: '1', name: `${'1.'.green} Crear tareas` },
                { value: '2', name: `${'2.'.green} Listar tarea` },
                { value: '3', name: `${'3.'.green} Tareas completadas` },
                { value: '4', name: `${'4.'.green} Tareas pendientes` },
                { value: '5', name: `${'5.'.green} Completar tareas` },
                { value: '6', name: `${'6.'.green} Borrar tarea` },
                { value: '7', name: `${'7.'.green} Modificar tarea` },
                { value: '8', name: `${'8.'.green} Salir` },
            ],
        },
    ];
    console.clear();
    console.log('-------------------------'.green);
    console.log('    TO-DO Console App    '.yellow);
    console.log('-------------------------\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;
};

const deleteMenu = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const index = `${i + 2}`.green;
        return { value: task.id, name: `${index} ${task.description}` };
    });
    choices.unshift({ value: '1', name: '1 Cancelar'.red });
    const question = [{ type: 'list', name: 'id', message: 'Borrar', choices }];
    const { id } = await inquirer.prompt(question);
    return id;
};

const checkMenu = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const index = `${i + 1}`.green;
        return { value: task.id, name: `${index} ${task.description}`, checked: task.finished };
    });
    const question = [{ type: 'checkbox', name: 'ids', message: 'Selecciona', choices }];
    const { ids } = await inquirer.prompt(question);
    return ids;
};

const modifyMenu = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const index = `${i + 2}`.green;
        return { value: task.id, name: `${index} ${task.description}` };
    });
    choices.unshift({ value: '1', name: '1 Cancelar'.red });
    const question = [{ type: 'list', name: 'id', message: 'Modificar', choices }];
    const { id } = await inquirer.prompt(question);
    return id;
};

module.exports = { todoMenu, pause, readInput, deleteMenu, confirm, checkMenu, modifyMenu };
