import * as React from 'react';
import { render } from 'react-dom';

import './css/app.css';
import { AppContainer } from './components/AppContainer';
import { store } from './store/SudokuStore';
import { Provider } from 'react-redux';

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root'),
);
