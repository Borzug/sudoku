import * as React from 'react';
import i18next from 'i18next';

import { Props } from './types';

const Controls: React.StatelessComponent<Props> = ({ isDisabled, getGame, checkSolution, getCellValue }) => (
    <div className="controls">
        <button className="controls__button controls__button-new_game" onClick={getGame} disabled={isDisabled}>
            {i18next.t('controls.newGame')}
        </button>

        <button className="controls__button controls__button-reveal_cell" onClick={getCellValue} disabled={isDisabled}>
            {i18next.t('controls.openCell')}
        </button>

        <button
            className="controls__button controls__button-check_solution"
            onClick={checkSolution}
            disabled={isDisabled}
        >
            {i18next.t('controls.checkBoard')}
        </button>
    </div>
);

export { Controls };
