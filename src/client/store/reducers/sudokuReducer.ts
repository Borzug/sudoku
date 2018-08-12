import { Store, SudokuReducer } from '../SudokuStoreTypes';
import { Action } from '../../actions/types';

export const sudokuReducer: SudokuReducer<Store> = (state: Store, action: Action): Store => {
    switch (action.type) {
        case 'REQUEST_NEW_GAME':
            return { ...state, ...{ isLoading: true } };

        case 'REQUEST_NEW_GAME_SUCCESSFUL':
            const playedGamesIDs =
                state.playedGamesIDs.indexOf(action.game.id) === -1
                    ? [...state.playedGamesIDs, action.game.id]
                    : [action.game.id];
            return {
                ...state,
                ...{
                    playedGamesIDs,
                    isLoading: false,
                    currentGame: action.game,
                    focusedCellIndex: null,
                    message: '',
                },
            };

        case 'CHECK_SOLUTION':
            return { ...state, ...{ message: 'Идёт проверка решения...' } };

        case 'CHECK_SOLUTION_SUCCESSFUL':
            return { ...state, ...{ message: action.result } };

        case 'SELECT_CELL':
            return { ...state, ...{ focusedCellIndex: action.cellIndex } };

        case 'REVEAL_CELL_VALUE':
            return { ...state, ...{ message: 'Ячейка открывается...' } };

        case 'REVEAL_CELL_VALUE_SUCCESSFUL':
            const currentGame = state.currentGame;
            if (currentGame) {
                currentGame.board[action.cellIndex] = action.cellValue;
            }

            return {
                ...state,
                ...{
                    currentGame,
                    message: '',
                },
            };

        case 'SET_CELL_VALUE': {
            if (state.focusedCellIndex === null) {
                return state;
            }

            const currentGame = state.currentGame;

            if (currentGame) {
                currentGame.board[state.focusedCellIndex] = action.cellValue;
            }

            return {
                ...state,
                ...{
                    currentGame,
                    message: '',
                },
            };
        }

        case 'SET_MESSAGE':
            return { ...state, ...{ message: action.message } };

        default:
            return state;
    }
};
