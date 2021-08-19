// const Tarea = require('./tarea');
const { v4: uudiv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    fechaCompletado = null;

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
        this.fechaCompletado = null;
    }
}
class Tareas {
    _listado = {};
    constructor() {
        this._listado = {};
    }

    createTarea(desc = '') {
        const t = new Tarea(desc);
        this._listado[t.id] = t;
    }

    get toArray() {
        const l = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            l.push(tarea);
        });
        return l;
    }
    loadTareasArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }
}
module.exports = Tareas;
