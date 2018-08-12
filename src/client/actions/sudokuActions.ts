import { Dispatch } from 'redux';
import { Store, SudokuGame } from '../store/SudokuStoreTypes';
import { HOST } from '../appRouter';
import { Action, SelectCellAction, SetCellValueAction, SolutionCheckResult } from './types';

const requestHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

export const actionCreators = {
    requestBoardAction: () => (dispatch: Dispatch<Action>, getState: () => Store) => {
        dispatch({ type: 'REQUEST_NEW_GAME' });

        fetch(`${HOST}`, {
            method: 'post',
            headers: requestHeaders,
            body: JSON.stringify(getState().playedGamesIDs),
        })
            .then(response => response.json())
            .then((game: SudokuGame) => {
                console.log(game);
                dispatch({ type: 'REQUEST_NEW_GAME_SUCCESSFUL', game });
            })
            .catch(error => {
                console.log(error);
            });
    },

    selectCellAction: (cellIndex: number): SelectCellAction => ({
        type: 'SELECT_CELL',
        cellIndex,
    }),

    setCellValueAction: (cellValue: number): SetCellValueAction => ({ type: 'SET_CELL_VALUE', cellValue }),

    revealCellValueAction: () => (dispatch: Dispatch<Action>, state: Store) => {
        if (
            state.focusedCellIndex === null ||
            (state.currentGame && state.currentGame.board[state.focusedCellIndex] !== 0)
        ) {
            return;
        }

        if (state.currentGame && state.focusedCellIndex !== null) {
            fetch(`${HOST}/revealcell?gameId=${state.currentGame.id}&cellIndex=${state.focusedCellIndex}`)
                .then(response => response.json())
                .then((cellValue: number) => {
                    dispatch({
                        cellValue,
                        cellIndex: state.focusedCellIndex as number,
                        type: 'REVEAL_CELL_VALUE_SUCCESSFUL',
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },

    checkSolutionAction: () => (dispatch: Dispatch<Action>, getState: () => Store) => {
        dispatch({ type: 'CHECK_SOLUTION' });

        const game = getState().currentGame;
        const gameId = game ? game.id : null;

        fetch(`${HOST}/check`, {
            headers: requestHeaders,
            method: 'POST',
            body: JSON.stringify(game),
        })
            .then(response => response.json())
            .then((result: SolutionCheckResult) => {
                const currentGame = getState().currentGame;
                let message = '';
                if (currentGame && currentGame.id === gameId) {
                    if (result.isValid && result.isComplete) {
                        message = 'Поздравляю Вас! Вы правильно решили Судоку!';
                    } else if (result.isValid && !result.isComplete) {
                        message = 'В решении нет ошибок.';
                    } else {
                        message = 'В решении есть ошибки';
                    }

                    dispatch({ type: 'CHECK_SOLUTION_SUCCESSFUL', result: message });
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
};
