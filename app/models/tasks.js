const { v4: uudiv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    finished = false;

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
        this.dateCreated = new Date().toUTCString();
        this.finished = false;
        this.dateFinished = null;
    }
}
class TaskList {
    _list = {};
    constructor() {
        this._list = {};
    }

    createTask(desc = '') {
        const t = new Task(desc);
        this._list[t.id] = t;
    }
    deleteTask(id) {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    get toArray() {
        const l = [];
        Object.keys(this._list).forEach((key) => {
            const tarea = this._list[key];
            l.push(tarea);
        });
        return l;
    }

    loadTaskArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._list[tarea.id] = tarea;
        });
    }

    listAll() {
        this.toArray.forEach((tarea, i) => {
            const { desc, finished, dateCreated, dateFinished } = tarea;
            finished
                ? console.log(` (Finalizada) [${dateCreated} - ${dateFinished}] ${desc}`.bold.green)
                : console.log(` (Procesando) [${dateCreated}] ${desc}`.bold.red);
        });
    }

    listByCompleted(completed = false) {
        const c = this.toArray.filter((tarea) => tarea.finished == completed);

        c.forEach((tarea) => {
            const { desc, finished, dateCreated, dateFinished } = tarea;

            if (finished == false) {
                console.log(`[${dateCreated}] ${desc}`.bold.red);
            }
            if (finished == true) {
                console.log(` [${dateCreated} - ${dateFinished}] ${desc}`.bold.green);
            }
        });
    }
}
module.exports = TaskList;
