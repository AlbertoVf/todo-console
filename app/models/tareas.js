// const Tarea = require('./tarea');
const { v4: uudiv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    fechaCompletado = false;

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
        this.fechaCompletado = false;
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
    listAll() {
        this.toArray.forEach((tarea, i) => {
            const index = `(${i + 1})`.bold.blue;
            const { desc, fechaCompletado } = tarea;
            const estado = fechaCompletado ? '(Completada)'.green : '(Pendiente)'.yellow;
            console.log(`\t${index} ${desc} ${estado}`);
        });
    }
    listCompleted(completed = null) {
        const c = this.toArray.filter((tarea) => tarea.fechaCompletado == completed);

        c.forEach((tarea) => {
            const { desc, fechaCompletado } = tarea;
            let d = `[${fechaCompletado}]`.bold.blue;
            console.log(`${d} ${desc}`);
        });
    }
}
module.exports = Tareas;
