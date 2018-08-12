import * as React from 'react';

import { Props } from './types';

const Header: React.StatelessComponent<Props> = ({ headerText }) => (
    <div>
        <h1>{headerText}</h1>
    </div>
);

export { Header };
