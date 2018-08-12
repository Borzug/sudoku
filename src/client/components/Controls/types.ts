import { ThunkedAction, GetGameAction, CheckSolutionAction, GetCellValueAction } from '../../actions/types';

export interface Props {
    isDisabled: boolean;
    getGame: () => ThunkedAction<GetGameAction>;
    checkSolution: () => ThunkedAction<CheckSolutionAction>;
    getCellValue: () => ThunkedAction<GetCellValueAction>;
}
