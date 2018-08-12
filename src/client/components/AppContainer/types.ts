import { SudokuGame } from '../../store/SudokuStoreTypes';
import { ThunkedAction, CheckSolutionAction, GetCellValueAction, GetGameAction } from '../../actions/types';

export interface Props {
    isLoading: boolean;
    isFetching: boolean;
    currentGame: SudokuGame | null;
    message: string;
}

export interface PropsUpdaters {
    getGame: () => ThunkedAction<GetGameAction>;
    checkSolution: () => ThunkedAction<CheckSolutionAction>;
    getCellValue: () => ThunkedAction<GetCellValueAction>;
}
