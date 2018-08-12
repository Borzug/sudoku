import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Board } from '../Board';
import { Controls } from '../Controls';
import { Header } from '../Header';
import { Message } from '../Message';
import { Store } from '../../store/SudokuStoreTypes';
import { actionCreators } from '../../actions/sudokuActions';
import { Props, PropsUpdaters } from './types';

class AppContainer extends React.Component<Props & PropsUpdaters> {
    componentDidMount() {
        this.props.actions.requestBoard();
    }

    public render() {
        return (
            <div>
                {this.props.isLoading ? (
                    <div>Загрузка</div>
                ) : (
                    <div className="container">
                        {console.log('Container re-render check!')}
                        <Header
                            headerText={
                                this.props.currentGame
                                    ? `Загружена доска №${this.props.currentGame.id + 1}`
                                    : 'Игра загружается.'
                            }
                        />
                        <Board />
                        <Controls requestNewGame={this.props.actions.requestBoard} />
                        <Message message={'Тест'} />
                    </div>
                )}
            </div>
        );
    }
}

function mapState(state: Store): Props {
    return {
        isLoading: state.isLoading,
        currentGame: state.currentGame,
    };
}

function mapDispatch(dispatch: Dispatch): PropsUpdaters {
    return {
        actions: bindActionCreators(
            {
                requestBoard: actionCreators.requestBoardAction,
            },
            dispatch,
        ),
    };
}

export default connect(
    mapState,
    mapDispatch,
)(AppContainer);
