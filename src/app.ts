import express from 'express';
import path from 'path';
import { CURR_DIR } from './config/constants';

const app = express();

app.use(express.static(path.join(CURR_DIR, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(CURR_DIR, 'public', 'index.html'));
});

export default app;