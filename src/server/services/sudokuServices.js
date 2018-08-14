'use strict';
exports.__esModule = true;
var gamesList = require('../models/gameBoards');
var SudokuService = /** @class */ (function() {
    function SudokuService() {}
    SudokuService.prototype.getNewBoard = function(playedGamesIDs) {
        if (playedGamesIDs === void 0) {
            playedGamesIDs = null;
        }
        var gamesList = this._getGamesList();
        if (playedGamesIDs === null || playedGamesIDs.length === gamesList.length) {
            return gamesList[Math.floor(Math.random() * gamesList.length)];
        }
        var notPlayedGamesList = gamesList.filter(function(game) {
            return !playedGamesIDs.some(function(id) {
                return id === game.id;
            });
        });
        return notPlayedGamesList[Math.floor(Math.random() * notPlayedGamesList.length)];
    };
    SudokuService.prototype.checkSolution = function(game) {
        var solution = game.solution;
        var boardSize = solution.length;
        var solutionCheckResult = {
            isComplete: true,
            isValid: true,
        };
        for (var cellIndex = 0; cellIndex < boardSize; cellIndex++) {
            if (game.board[cellIndex] === 0) {
                solutionCheckResult.isComplete = false;
            } else if (game.board[cellIndex] !== solution[cellIndex]) {
                solutionCheckResult.isValid = false;
            }
        }
        return solutionCheckResult;
    };
    SudokuService.prototype.getCellValue = function(gameId, cellIndex) {
        var game = this._getGame(gameId);
        return game.solution[cellIndex];
    };
    SudokuService.prototype._getGamesList = function() {
        return gamesList;
    };
    SudokuService.prototype._getGame = function(id) {
        var game = gamesList.find(function(game) {
            return game.id === id;
        });
        if (game) {
            return game;
        }
        throw new Error();
    };
    return SudokuService;
})();
var service = new SudokuService();
exports.service = service;
