import { App } from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 8080;

new App().start(PORT);
