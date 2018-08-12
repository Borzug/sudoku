import { SudokuGame } from '../../store/SudokuStoreTypes';

export interface Props {
    initialBoard: number[] | null;
    currentGame: SudokuGame | null;
    focusedCellIndex: number | null;
}

export interface PropsUpdaters {
    actions: any;
}
