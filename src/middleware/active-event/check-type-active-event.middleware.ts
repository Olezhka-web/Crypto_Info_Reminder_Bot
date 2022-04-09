import { bot } from '../../create-bot';
import { BotResponsesEnum, ErrorMessagesEnum, StatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IActiveEvent, IUser } from '../../models';
import { activeEventService } from '../../services';

// eslint-disable-next-line max-len
export const checkTypeActiveEventMiddleware = (activeEvent: string) => async (userObj: IUser): Promise<{ userObj: IUser, userActiveEvent: IActiveEvent }> => {
    const { _id, chatId } = userObj;

    const userActiveEvent = await activeEventService.findActiveEvent({ userId: _id, activeEvent });

    if (!userActiveEvent) {
        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_ERROR);

        throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, ErrorMessagesEnum.BOT_ERROR_TYPE_ACTIVE_EVENT);
    }

    return { userObj, userActiveEvent };
};
