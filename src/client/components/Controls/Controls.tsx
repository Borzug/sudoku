import * as React from 'react';

import { Props } from './types';

const Controls: React.StatelessComponent<Props> = ({ requestNewGame }) => (
    <div>
        <button onClick={requestNewGame}>Новая игра</button>
    </div>
);

export { Controls };
