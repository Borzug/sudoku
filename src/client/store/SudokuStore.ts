import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { sudokuReducer } from './reducers/sudokuReducer';

import { Store } from './SudokuStoreTypes';

export const initialState: Store = {
    isLoading: false,
    currentGame: null,
    playedGamesIDs: [],
    focusedCellIndex: null,
    message: '',
};

function configureStore() {
    return createStore(sudokuReducer, initialState, applyMiddleware(thunk));
}

export const store = configureStore();
