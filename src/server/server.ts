import { Response, Request } from 'express';
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

import { service } from './services/sudokuServices';
import { GET_GAME, CHECK_SOLUTION, GET_CELL_VALUE } from '../routes';

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + './../../dist/'));

app.post(GET_GAME, (req: Request, res: Response) => {
    const playedGamesList = req.body;
    const board = service.getNewBoard(playedGamesList);

    res.status(200).json(board);
});

app.post(CHECK_SOLUTION, (req: Request, res: Response) => {
    const game = req.body;
    const solutionCheckResult = service.checkSolution(game);

    res.status(200).json(solutionCheckResult);
});

app.post(GET_CELL_VALUE, (req: Request, res: Response) => {
    const gameId = req.body.gameId;
    const cellIndex = req.body.cellIndex;
    const cellValue = service.getCellValue(gameId, cellIndex);

    res.status(200).json(cellValue);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!\n');
});
