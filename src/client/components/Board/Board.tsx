import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Store } from '../../store/SudokuStoreTypes';
import { Props, PropsUpdaters } from './types';
import { actionCreators } from '../../actions/sudokuActions';

class Board extends React.Component<Props & PropsUpdaters> {
    render() {
        // const sudokuBoardSideLength: number = this.props.currentGame
        //     ? Math.sqrt(this.props.currentGame.board.length)
        //     : 0;
        return (
            <div className="board">
                {console.log('Board re-render check!')}
                {this.props.currentGame
                    ? this.props.currentGame.board.map((cell, index) => {
                          return (
                              <div key={`${index} + ${cell}`} className="board__cell">
                                  {cell}
                              </div>
                          );
                      })
                    : null}
            </div>
        );
    }
}

function mapState(state: Store): Props {
    return {
        currentGame: state.currentGame,
    };
}

function mapDispatch(dispatch: Dispatch): PropsUpdaters {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}

export default connect(
    mapState,
    mapDispatch,
)(Board);
