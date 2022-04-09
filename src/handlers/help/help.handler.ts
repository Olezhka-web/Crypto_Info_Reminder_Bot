import { Chat } from 'node-telegram-bot-api';

import { bot } from '../../create-bot';
import { BotResponsesEnum } from '../../constants';

export const helpHandler = async (chat: Chat): Promise<void> => {
    const { id } = chat;

    await bot.sendMessage(id, BotResponsesEnum.BOT_RESPONSE_HELP, { parse_mode: 'HTML' });
};
