import i18next from 'i18next';

import { Store, SudokuGame } from '../store/SudokuStoreTypes';

import { Action, SelectCellAction, SetCellValueAction, SolutionCheckResult, ThunkedAction } from './types';
import { HOST, GET_GAME, GET_CELL_VALUE, CHECK_SOLUTION } from '../../routes';

const requestHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
};

export const actionCreators = {
    getGameAction: (): ThunkedAction<Action> => (dispatch, getState: () => Store) => {
        dispatch({ type: 'GET_GAME' });

        fetch(getUrl(GET_GAME), {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(getState().playedGamesIDs)
        })
            .then(response => response.json())
            .then((game: SudokuGame) => dispatch({ type: 'GET_GAME_SUCCESSFUL', game }))
            .catch(() => dispatch({ type: 'FETCHING_FAILED' }));
    },

    selectCellAction: (cellIndex: number): SelectCellAction => ({
        type: 'SELECT_CELL',
        cellIndex
    }),

    setCellValueAction: (cellValue: number): SetCellValueAction => ({ type: 'SET_CELL_VALUE', cellValue }),

    getCellValueAction: (): ThunkedAction<Action> => (dispatch, getState: () => Store) => {
        const state = getState();
        if (state.focusedCellIndex === null) {
            return;
        }

        if (state.currentGame && state.focusedCellIndex !== null) {
            fetch(getUrl(GET_CELL_VALUE), {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({
                    gameId: state.currentGame!.id,
                    cellIndex: state.focusedCellIndex
                })
            })
                .then(response => response.json())
                .then((cellValue: number) =>
                    dispatch({
                        cellValue,
                        cellIndex: state.focusedCellIndex as number,
                        type: 'GET_CELL_VALUE_SUCCESSFUL'
                    })
                )
                .catch(() => dispatch({ type: 'FETCHING_FAILED' }));
        }
    },

    checkSolutionAction: (): ThunkedAction<Action> => (dispatch, getState: () => Store) => {
        dispatch({ type: 'CHECK_SOLUTION' });

        const game = getState().currentGame;
        const gameId = game ? game.id : null;

        fetch(getUrl(CHECK_SOLUTION), {
            headers: requestHeaders,
            method: 'POST',
            body: JSON.stringify(game)
        })
            .then(response => response.json())
            .then((result: SolutionCheckResult) => {
                const currentGame = getState().currentGame;
                let message = '';
                if (currentGame && currentGame.id === gameId) {
                    if (result.isValid && result.isComplete) {
                        message = i18next.t('messages.solved');
                    } else if (result.isValid && !result.isComplete) {
                        message = i18next.t('messages.valid');
                    } else {
                        message = i18next.t('messages.invalid');
                    }

                    dispatch({ type: 'CHECK_SOLUTION_SUCCESSFUL', result: message });
                }
            })
            .catch(() => dispatch({ type: 'FETCHING_FAILED' }));
    }
};

function getUrl(path: string) {
    return `${HOST}${path}`;
}
