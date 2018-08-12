import * as React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../store/SudokuStoreTypes';
import { Props, PropsUpdaters } from './types';
import { actionCreators } from '../../actions/sudokuActions';
import { Cell } from '../Cell';

class Board extends React.Component<Props & PropsUpdaters> {
    public componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress);
    }

    public componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress);
    }

    private handleKeyPress = (event: KeyboardEvent) => {
        const key = parseInt(event.key);
        if (isNaN(key) || key === 0) {
            return;
        }

        this.props.setCellValue(key);
    };

    render() {
        return (
            <>
                {this.props.currentGame && (
                    <div className="board">
                        {this.props.currentGame.board.map((cell, index) => (
                            <Cell
                                key={index}
                                value={cell}
                                cellIndex={index}
                                isFocused={index === this.props.focusedCellIndex}
                                isBlocked={this.props.initialBoard![index] !== 0}
                                selectCell={this.props.selectCell}
                            />
                        ))}

                        {this.props.children}
                    </div>
                )}
            </>
        );
    }
}

function mapState(state: Store): Props {
    return {
        initialBoard: state.initialBoard,
        currentGame: state.currentGame,
        focusedCellIndex: state.focusedCellIndex
    };
}

export default connect(
    mapState,
    {
        selectCell: actionCreators.selectCellAction,
        setCellValue: actionCreators.setCellValueAction
    }
)(Board);
