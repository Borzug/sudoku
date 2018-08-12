import { SudokuGame } from '../../store/SudokuStoreTypes';

export interface Props {
    isLoading: boolean;
    currentGame: SudokuGame | null;
}

export interface PropsUpdaters {
    actions: {
        requestBoard: any;
    };
}
