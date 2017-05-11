const express = require('express');
const bodyParser = require('body-parser');

const postModel = require('../model/posts.js');
const voteModel = require('../model/votes.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/posts', function(req, res) {
    postModel.list(req.query.searchText).then(posts => {
        res.json(posts);
    });
});

// Create
router.post('/posts', function(req, res) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(mood, text).then(post => {
        res.json(post);
    });
});

// Vote
router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res) {
    const {id, mood} = req.params;
    if (!id || !mood) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    voteModel.create(id, mood).then(post => {
        res.json(post);
    });
});

module.exports = router;
