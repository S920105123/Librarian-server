const express = require('express');
const bodyParser = require('body-parser');

const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/todos', function(req, res) {
    todoModel.list(!!req.query.unaccomplishedOnly, req.query.searchText).then(todos => {
        res.json(todos);
    });
});

// Create
router.post('/todos', function(req, res) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.create(mood, text).then(todo => {
        res.json(todo);
    });
});

// Accomplish
router.put('/todos/:id', function(req, res) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Todo ID is required');
        err.status = 400;
        throw err;
    }
    todoModel.accomplish(id).then(todo => {
        res.json(todo);
    });
});

module.exports = router;
