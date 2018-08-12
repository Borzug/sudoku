export interface SolutionCheckResult {
    isComplete: boolean;
    isValid: boolean;
}

export interface SudokuGame {
    id: number;
    board: number[];
}
