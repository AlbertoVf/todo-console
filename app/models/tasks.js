const { v4: uudiv4 } = require('uuid');

class Task {
    constructor(description) {
        this.id = uudiv4();
        this.description = description;
        this.created = new Date().toUTCString();
        this.finished = null;
    }
}
class TaskList {
    _list = {};

    get toArray() {
        const l = [];
        Object.keys(this._list).forEach((key) => {
            const tarea = this._list[key];
            l.push(tarea);
        });
        return l;
    }

    constructor() {
        this._list = {};
    }

    createTask(description = '') {
        const t = new Task(description);
        this._list[t.id] = t;
    }

    deleteTask(id) {
        if (this._list[id]) delete this._list[id];
    }

    loadTaskArray(task = []) {
        task.forEach((tarea) => {
            this._list[tarea.id] = tarea;
        });
    }

    listByCompleted(state = 0) {
        let c = [];
        switch (state) {
            case 1:
                c = this.toArray.filter((tarea) => tarea.finished != null); // task finished
                break;
            case 2:
                c = this.toArray.filter((tarea) => tarea.finished == null); // task not finished
                break;
            default:
                c = this.toArray; // all task
        }
        c.forEach((tarea) => {
            const { description, created, finished } = tarea;
            finished
                ? console.log(` [${created} - ${finished}] ${description}`.bold.green)
                : console.log(` [${created}] ${description}`.bold.red);
        });
    }

    changeFinished(ids = []) {
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.finished) {
                task.finished = new Date().toUTCString();
            }
        });
        this.toArray.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].finished = null; // unchecked
            }
        });
    }

    changeDescription(id,newDescription) {
        console.log(`Actual: ${this._list[id].description}`)
        console.log(`Nueva: ${newDescription}`)
        if (this._list[id]) this._list[id].description=newDescription;
    }
}
module.exports = TaskList;
