import { Chat } from 'node-telegram-bot-api';

import { bot } from '../../create-bot';
import { BotResponsesEnum, ErrorMessagesEnum, StatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IUser } from '../../models';
import { userService } from '../../services';

export const checkIsUserExistsMiddleware = async (chat: Chat): Promise<IUser> => {
    const { id } = chat;

    const user = await userService.findOneUser({ chatId: id });

    if (!user) {
        await bot.sendMessage(chat.id, BotResponsesEnum.BOT_RESPONSE_USER_NOT_FOUND);

        throw new ErrorHandler(StatusCodesEnum.NOT_FOUND, ErrorMessagesEnum.BOT_ERROR_USER_NOT_FOUND);
    }

    if (user.name !== chat.first_name || user.surname !== (chat.last_name || '')) {
        await userService.updateUser({ _id: user._id }, {
            name: chat.first_name,
            surname: chat.last_name || ''
        });
    }

    return user;
};
