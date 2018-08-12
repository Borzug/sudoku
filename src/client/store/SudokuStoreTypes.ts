import { Action } from '../actions/types';

export interface SudokuGame {
    id: number;
    board: number[];
}

export interface Store {
    isLoading: boolean;
    isFetching: boolean;
    initialBoard: number[] | null;
    currentGame: SudokuGame | null;
    playedGamesIDs: number[];
    focusedCellIndex: number | null;
    message: string;
}

export type SudokuReducer<State> = (state: State, action: Action) => State;
