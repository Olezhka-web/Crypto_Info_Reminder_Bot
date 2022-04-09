import { bot } from '../../create-bot';
import { BotResponsesEnum, ErrorMessagesEnum, StatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IUser } from '../../models';
import { activeEventService } from '../../services';

export const checkIsActiveEventExistsMiddleware = async (userObj: IUser): Promise<IUser> => {
    const { _id, chatId } = userObj;

    const activeEventObj = await activeEventService.findActiveEvent({ userId: _id });

    if (activeEventObj) {
        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_ACTION_STARTED);

        throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, ErrorMessagesEnum.BOT_ERROR_ACTIVE_EVENT);
    }

    return userObj;
};
