import { bot } from '../../create-bot';
import { ActiveEventEnum, BotResponsesEnum } from '../../constants';
import { IUser } from '../../models';
import { activeEventService } from '../../services';

export const createCryptoActionHandler = async (userObj: IUser): Promise<void> => {
    const { _id, chatId } = userObj;

    await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_CREATE_CRYPTO_ACTION, { parse_mode: 'HTML' });

    await activeEventService.createActiveEvent({
        userId: _id,
        activeEvent: ActiveEventEnum.CREATE_CRYPTO
    });
};
