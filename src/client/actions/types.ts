import { SudokuGame, Store } from '../store/SudokuStoreTypes';

export interface GetGameAction {
    type: 'GET_GAME';
}

export interface GetGameSuccessfulAction {
    type: 'GET_GAME_SUCCESSFUL';
    game: SudokuGame;
}

export interface FetchingFailedAction {
    type: 'FETCHING_FAILED';
}

export interface CheckSolutionAction {
    type: 'CHECK_SOLUTION';
}

export interface CheckSolutionSuccessfulAction {
    type: 'CHECK_SOLUTION_SUCCESSFUL';
    result: string;
}

export interface GetCellValueAction {
    type: 'GET_CELL_VALUE';
}

export interface GetCellValueSuccessfulAction {
    type: 'GET_CELL_VALUE_SUCCESSFUL';
    cellIndex: number;
    cellValue: number;
}

export interface SelectCellAction {
    type: 'SELECT_CELL';
    cellIndex: number;
}

export interface SetCellValueAction {
    type: 'SET_CELL_VALUE';
    cellValue: number;
}

export interface SetMessageAction {
    type: 'SET_MESSAGE';
    message: string;
}

export interface SetLanguageAction {
    type: 'SET_LANGUAGE';
    language: string;
}

export type Action =
    | GetGameAction
    | GetGameSuccessfulAction
    | FetchingFailedAction
    | CheckSolutionAction
    | CheckSolutionSuccessfulAction
    | GetCellValueAction
    | GetCellValueSuccessfulAction
    | SelectCellAction
    | SetCellValueAction
    | SetMessageAction;

export interface SolutionCheckResult {
    isComplete: boolean;
    isValid: boolean;
}

export interface ThunkedAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => Store): void;
}
