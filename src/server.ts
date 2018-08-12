import { Response, Request, NextFunction } from 'express';
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

import { service } from './services/sudokuServices';

app.use(
    (req: Request, res: Response, next: NextFunction): void => {
        res.header('Content-Type', 'application/json');
        next();
    },
);

app.use(bodyParser.json());

app.use(cors());

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    const playedGamesList = req.body;
    const board = service.getNewBoard(playedGamesList);
    res.send(board);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!\n');
});
