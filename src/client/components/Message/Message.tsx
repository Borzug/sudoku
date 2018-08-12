import * as React from 'react';
import { Props } from './types';

const Message: React.SFC<Props> = ({ message }) => <div className="message">{message}</div>;

export { Message };
