'use strict';
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var sudokuServices_1 = require('./services/sudokuServices');
var routes_1 = require('../routes');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../../dist/'));
app.post(routes_1.GET_GAME, function(req, res) {
    var playedGamesList = req.body;
    var board = sudokuServices_1.service.getNewBoard(playedGamesList);
    res.status(200).json(board);
});
app.post(routes_1.CHECK_SOLUTION, function(req, res) {
    var game = req.body;
    var solutionCheckResult = sudokuServices_1.service.checkSolution(game);
    res.status(200).json(solutionCheckResult);
});
app.post(routes_1.GET_CELL_VALUE, function(req, res) {
    var gameId = req.body.gameId;
    var cellIndex = req.body.cellIndex;
    var cellValue = sudokuServices_1.service.getCellValue(gameId, cellIndex);
    res.status(200).json(cellValue);
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Example app listening on port 3000!\n');
});
