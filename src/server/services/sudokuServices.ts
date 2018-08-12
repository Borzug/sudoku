import { SolutionCheckResult, SudokuGame } from '../models/types';
const gamesList = require('../models/gameBoards');

class SudokuService {
    public getNewBoard(playedGamesIDs: number[] | null = null): SudokuGame {
        const gamesList: SudokuGame[] = this._getGamesList();

        if (playedGamesIDs === null || playedGamesIDs.length === gamesList.length) {
            return gamesList[Math.floor(Math.random() * gamesList.length)];
        }

        const notPlayedGamesList = gamesList.filter(game => !playedGamesIDs.some(id => id === game.id));

        return notPlayedGamesList[Math.floor(Math.random() * notPlayedGamesList.length)];
    }

    public checkSolution(game: SudokuGame): SolutionCheckResult {
        const solution = this._getGame(game.id).solution;
        const boardSize = solution.length;

        const solutionCheckResult = {
            isComplete: true,
            isValid: true
        };

        for (let cellIndex = 0; cellIndex < boardSize; cellIndex++) {
            if (game.board[cellIndex] === 0) {
                solutionCheckResult.isComplete = false;
            } else if (game.board[cellIndex] !== solution[cellIndex]) {
                solutionCheckResult.isValid = false;
            }
        }

        return solutionCheckResult;
    }

    public getCellValue(gameId: number, cellIndex: number): number {
        const game: SudokuGame = this._getGame(gameId);

        return game.solution[cellIndex];
    }

    private _getGamesList(): SudokuGame[] {
        return gamesList;
    }

    private _getGame(id: number): SudokuGame {
        const game = gamesList.find((game: SudokuGame) => game.id === id);

        if (game) {
            return game;
        }

        throw new Error();
    }
}

const service = new SudokuService();

export { service };
