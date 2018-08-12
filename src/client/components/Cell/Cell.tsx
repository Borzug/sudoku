import * as React from 'react';
import { Props } from './types';
import classnames from 'classnames';

const Cell: React.SFC<Props> = ({ value, cellIndex, isFocused, isBlocked, selectCell }) => {
    return (
        <div
            className={classnames('board__cell', {
                'board__cell-blocked': isBlocked,
                'board__cell-odd_square': getSquareNumber(cellIndex) % 2 && !isFocused,
                'board__cell-focused': isFocused
            })}
            onClick={() => selectCell(cellIndex)}
        >
            {value !== 0 && value}
        </div>
    );
};

export { Cell };

function getSquareNumber(cellIndex: number) {
    const columnIndex = cellIndex % 9;
    const rowIndex = cellIndex / 9;
    const a = Math.floor(rowIndex / 3) * 3;
    const b = Math.floor(columnIndex / 3) + 1;

    return a + b;
}
