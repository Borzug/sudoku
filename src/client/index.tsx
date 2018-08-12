import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import * as ru from '../locales/ru.json';

import './css/app.css';
import { AppContainer } from './components/AppContainer';
import { store } from './store/SudokuStore';

i18next.init({
    lng: 'ru',
    resources: ru
});

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);
