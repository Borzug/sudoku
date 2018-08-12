import { SudokuGame } from '../store/SudokuStoreTypes';

export interface RequestNewGameAction {
    type: 'REQUEST_NEW_GAME';
}

export interface RequestNewGameSuccessfulAction {
    type: 'REQUEST_NEW_GAME_SUCCESSFUL';
    game: SudokuGame;
}

export interface CheckSolutionAction {
    type: 'CHECK_SOLUTION';
}

export interface CheckSolutionSuccessfulAction {
    type: 'CHECK_SOLUTION_SUCCESSFUL';
    result: string;
}

export interface RevealCellValueAction {
    type: 'REVEAL_CELL_VALUE';
}

export interface RevealCellValueSuccessfulAction {
    type: 'REVEAL_CELL_VALUE_SUCCESSFUL';
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

export type Action =
    | RequestNewGameAction
    | RequestNewGameSuccessfulAction
    | CheckSolutionAction
    | CheckSolutionSuccessfulAction
    | RevealCellValueAction
    | RevealCellValueSuccessfulAction
    | SelectCellAction
    | SetCellValueAction
    | SetMessageAction;

export interface SolutionCheckResult {
    isComplete: boolean;
    isValid: boolean;
}
