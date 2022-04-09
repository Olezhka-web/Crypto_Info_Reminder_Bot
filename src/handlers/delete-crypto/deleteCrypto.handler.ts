import { bot } from '../../create-bot';
import { BotResponsesEnum } from '../../constants';
import { IActiveEvent, IUser } from '../../models';
import { activeEventService, userService } from '../../services';

export const deleteCryptoHandler = async (data: string, activeEventObj: IActiveEvent, userObj: IUser): Promise<void> => {
    const [cryptoName, price] = data.trim().toUpperCase().split('\n');

    const { chatId, _id, crypto_data } = userObj;

    if (!Number(price)) {
        await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_ERROR_NUMBER);

        return;
    }

    const findCryptoObjIndex = crypto_data.findIndex(el => el.cryptoName === cryptoName && el.price === +price);

    if (findCryptoObjIndex === -1) {
        await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_CRYPTO_NOT_FOUND_DB);

        return;
    }

    crypto_data.splice(findCryptoObjIndex, 1);

    await userService.updateUser({ _id }, { crypto_data });

    await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

    await bot.sendMessage(chatId, `Your crypto ${cryptoName} ${price} deleted!`);
};
