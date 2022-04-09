import { bot } from '../../create-bot';
import { ActiveEventEnum, BotResponsesEnum } from '../../constants';
import { IUser } from '../../models';
import { activeEventService } from '../../services';

export const deleteCryptoActionHandler = async (userObj: IUser): Promise<void> => {
    const { _id, chatId } = userObj;

    await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_DELETE_CRYPTO_ACTION, { parse_mode: 'HTML' });

    await activeEventService.createActiveEvent({
        userId: _id,
        activeEvent: ActiveEventEnum.DELETE_CRYPTO
    });
};
