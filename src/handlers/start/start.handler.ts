import { Chat } from 'node-telegram-bot-api';

import { bot } from '../../create-bot';
import { BotResponsesEnum } from '../../constants';
import { userService } from '../../services';

export const startHandler = async (chat: Chat): Promise<void> => {
    const user = await userService.findOneUser({ chatId: chat.id });

    if (!user) {
        await userService.createUser({
            chatId: chat.id,
            name: chat.first_name,
            surname: chat.last_name || '',
            tag: `id=${chat.id}`
        });

        await bot.sendMessage(chat.id, BotResponsesEnum.BOT_RESPONSE_USER_REGISTER);

        return;
    }

    if (user.name !== chat.first_name || user.surname !== (chat.last_name || '')) {
        await userService.updateUser({ _id: user._id }, {
            name: chat.first_name,
            surname: chat.last_name || ''
        });
    }

    await bot.sendMessage(chat.id, BotResponsesEnum.BOT_RESPONSE_USER_ALREADY_REGISTERED);
};
