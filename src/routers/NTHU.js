const express = require('express');
const bodyParser = require('body-parser');

const libraryModel = require('../model/NTHUModel.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/NTHU/book', function(req, res) {
    libraryModel.getBook(req.query.searchText).then(html => {
        res.json({"html": `${html}`});
    });
});

router.get('/NTHU/ISBN', function(req, res) {
    libraryModel.getISBN(req.query.searchText).then(html => {
        res.json({"html": `${html}`});
    });
});

module.exports = router;
