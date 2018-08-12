import * as React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';

import { Board } from '../Board';
import { Controls } from '../Controls';
import { Header } from '../Header';
import { Message } from '../Message';
import { Store } from '../../store/SudokuStoreTypes';
import { actionCreators } from '../../actions/sudokuActions';
import { Props, PropsUpdaters } from './types';

class AppContainer extends React.Component<Props & PropsUpdaters> {
    componentDidMount() {
        this.props.getGame();
    }

    public render() {
        return (
            <div className={'container'}>
                <Header
                    headerText={this.props.currentGame && i18next.t('gameName', { gameId: this.props.currentGame.id })}
                />
                <Board>
                    {this.props.isLoading && (
                        <div className="container__loading_spinner">
                            <img src={'https://loading.io/spinners/azure/index.azure-round-loader.svg'} />
                        </div>
                    )}
                </Board>

                <Controls
                    isDisabled={this.props.isFetching}
                    getGame={this.props.getGame}
                    checkSolution={this.props.checkSolution}
                    getCellValue={this.props.getCellValue}
                />
                <Message message={this.props.message} />
            </div>
        );
    }
}

function mapState(state: Store): Props {
    return {
        isLoading: state.isLoading,
        isFetching: state.isFetching,
        currentGame: state.currentGame,
        message: state.message
    };
}

export default connect(
    mapState,
    {
        getGame: actionCreators.getGameAction,
        checkSolution: actionCreators.checkSolutionAction,
        getCellValue: actionCreators.getCellValueAction
    }
)(AppContainer);
