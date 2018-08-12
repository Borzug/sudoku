import { SudokuGame } from '../../store/SudokuStoreTypes';

export interface Props {
    currentGame: SudokuGame | null;
}

export interface PropsUpdaters {
    actions: any;
}
