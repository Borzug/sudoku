import i18next from 'i18next';

import { Store, SudokuReducer } from '../SudokuStoreTypes';
import { Action } from '../../actions/types';

export const sudokuReducer: SudokuReducer<Store> = (state: Store, action: Action): Store => {
    switch (action.type) {
        case 'GET_GAME':
            return { ...state, isLoading: true, isFetching: true, message: i18next.t('messages.loading') };

        case 'GET_GAME_SUCCESSFUL':
            const playedGamesIDs =
                state.playedGamesIDs.indexOf(action.game.id) === -1
                    ? [...state.playedGamesIDs, action.game.id]
                    : [action.game.id];
            return {
                ...state,
                playedGamesIDs,
                isLoading: false,
                isFetching: false,
                initialBoard: action.game.board.slice(0),
                currentGame: action.game,
                focusedCellIndex: null,
                message: ''
            };
        case 'FETCHING_FAILED':
            return {
                ...state,
                isLoading: false,
                isFetching: false,
                message: i18next.t('messages.fetchingError')
            };

        case 'CHECK_SOLUTION':
            return { ...state, message: i18next.t('messages.checkingBoard'), isFetching: true };

        case 'CHECK_SOLUTION_SUCCESSFUL':
            return { ...state, isFetching: false };

        case 'SELECT_CELL':
            if (state.initialBoard && state.initialBoard[action.cellIndex] === 0) {
                return { ...state, focusedCellIndex: action.cellIndex };
            }
            return state;

        case 'GET_CELL_VALUE':
            return { ...state, message: i18next.t('messages.openingCell'), isFetching: true };

        case 'GET_CELL_VALUE_SUCCESSFUL':
            const currentGame = { ...state.currentGame! };

            if (currentGame) {
                currentGame.board[action.cellIndex] = action.cellValue;
            }

            return {
                ...state,
                isFetching: false,
                currentGame,
                message: ''
            };

        case 'SET_CELL_VALUE': {
            if (state.focusedCellIndex === null) {
                return state;
            }

            const currentGame = { ...state.currentGame! };

            if (currentGame) {
                currentGame.board[state.focusedCellIndex] = action.cellValue;
            }

            return {
                ...state,
                currentGame,
                message: ''
            };
        }

        case 'SET_MESSAGE':
            return { ...state, ...{ message: action.message } };

        default:
            return state;
    }
};
