import { bot } from '../../create-bot';
import { ActiveEventEnum, BotResponsesEnum } from '../../constants';
import { createCryptoHandler, deleteCryptoHandler, updateCryptoHandler } from '../../handlers';
import { IUser } from '../../models';
import { activeEventService } from '../../services';

export const extraBotHandler = (text: string) => async (userObj: IUser): Promise<void> => {
    const { _id, chatId } = userObj;

    const activeEventObj = await activeEventService.findActiveEvent({ userId: _id });

    if (activeEventObj) {
        const { activeEvent } = activeEventObj;

        switch (activeEvent) {
            case ActiveEventEnum.CREATE_CRYPTO:
                return createCryptoHandler(text, activeEventObj, userObj);
            case ActiveEventEnum.UPDATE_CRYPTO:
                return updateCryptoHandler(text, activeEventObj, userObj);
            case ActiveEventEnum.DELETE_CRYPTO:
                return deleteCryptoHandler(text, activeEventObj, userObj);
            default:
                await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_ACTION_STARTED);

                return;
        }
    }

    await bot.sendMessage(userObj.chatId, BotResponsesEnum.BOT_RESPONSE_UNKNOWN_COMMAND);
};
