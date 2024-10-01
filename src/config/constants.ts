import process from "node:process";
import dotenv from 'dotenv';

const CURR_DIR: string = process.cwd();

dotenv.config();

const PORT: number = Number(process.env.PORT);
const HOST: string = process.env.HOST || 'localhost';

export {
    CURR_DIR,
    PORT,
    HOST
}