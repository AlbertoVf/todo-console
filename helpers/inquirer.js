const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Selecciona una opcion',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tareas`,
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tarea`,
            },
            {
                value: '3',
                name: `${'3.'.green} Tareas completadas`,
            },
            {
                value: '4',
                name: `${'4.'.green} Tareas pendientes`,
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`,
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`,
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('-------------------------'.green);
    console.log('    TO-DO Console App    '.yellow);
    console.log('-------------------------'.green);

    const { opt } = await inquirer.prompt(questions);
    return opt;
};

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`,
        },
    ];
    await inquirer.prompt(question);
};

module.exports = { inquirerMenu, pause };
