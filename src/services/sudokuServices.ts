import { SolutionCheckResult, SudokuGame } from '../models/types';
const gameBoardsList = require('../models/gameBoards');
const gameBoardsSolutionsList = require('../models/gameBoardsSolutions');

class SudokuService {
    public getNewBoard(playedGamesIDs: number[] | null = null): SudokuGame {
        const gamesList: SudokuGame[] = this._getGamesList();

        if (playedGamesIDs === null || playedGamesIDs.length === 0) {
            return gamesList[Math.floor(Math.random() * gamesList.length)];
        }

        const notPlayedGamesList = gamesList.filter(game => !playedGamesIDs.some(id => id === game.id));

        return notPlayedGamesList[Math.floor(Math.random() * notPlayedGamesList.length)];
    }

    public checkSolution(game: SudokuGame): SolutionCheckResult {
        const solution: SudokuGame = this._getSolution(game.id);
        const boardSize = solution.board.length;

        let solutionCheckResult = {
            isComplete: true,
            isValid: true,
        };

        for (let cellIndex = 0; cellIndex < boardSize; cellIndex++) {
            if (game.board[cellIndex] === 0) {
                solutionCheckResult.isComplete = false;
            }
            if (game.board[cellIndex] !== solution.board[cellIndex]) {
                solutionCheckResult.isValid = false;
            }
        }

        return solutionCheckResult;
    }

    public getCellValue(gameId: number, cellIndex: number): number {
        const solution: SudokuGame = this._getSolution(gameId);

        return solution.board[cellIndex];
    }

    private _getGamesList(): SudokuGame[] {
        return gameBoardsList;
    }

    private _getSolution(id: number): SudokuGame {
        const gameBoardSolution = gameBoardsSolutionsList.find((solution: SudokuGame) => solution.id === id);

        if (gameBoardSolution) {
            return gameBoardSolution;
        }

        throw new Error('Поле с указанным ID не найдено.');
    }
}

const service = new SudokuService();

export { service };
