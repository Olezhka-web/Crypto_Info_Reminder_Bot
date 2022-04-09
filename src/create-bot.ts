import * as TelegramBot from 'node-telegram-bot-api';

import { config } from './config';

export const bot = new TelegramBot(config.BOT_TOKEN_API, { polling: true, onlyFirstMatch: true });
