const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(unaccomplishedOnly = false, searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let todos = data ? JSON.parse(data) : [];
            if (todos.length > 0 && searchText) {
                todos = todos.filter(t => {
                    return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            if (todos.length > 0 && unaccomplishedOnly) {
                todos = todos.filter(t => {
                    return !t.doneTs;
                })
            }
            resolve(todos);
        });
    });
}

function create(mood, text) {
    return new Promise((resolve, reject) => {
        const newTodo = {
            id: uuid(),
            mood: mood,
            text: text,
            ts: moment().unix(),
            doneTs: null
        };
        list().then(todos => {
            todos = [
                newTodo,
                ...todos
            ];
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(newTodo);
            });
        });
    });
}

function accomplish(todoId) {
    let accomplishedTodo = null;
    return new Promise((resolve, reject) => {
        list().then(todos => {
            todos = todos.map(p => {
                if (p.id === todoId) {
                    accomplishedTodo = p;
                    p.doneTs=true;
                }
                return p;
            });

            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);
                resolve(accomplishedTodo);
            });
        });
    })
}

module.exports = {
    list,
    create,
    accomplish
};
