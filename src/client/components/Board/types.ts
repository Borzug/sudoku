import { SudokuGame } from '../../store/SudokuStoreTypes';
import { ThunkedAction, SetCellValueAction, SelectCellAction } from '../../actions/types';

export interface Props {
    initialBoard: number[] | null;
    currentGame: SudokuGame | null;
    focusedCellIndex: number | null;
}

export interface PropsUpdaters {
    selectCell: () => ThunkedAction<SelectCellAction>;
    setCellValue: (value: number) => ThunkedAction<SetCellValueAction>;
}
