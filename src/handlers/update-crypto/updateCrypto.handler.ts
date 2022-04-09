import { bot } from '../../create-bot';
import { BotResponsesEnum } from '../../constants';
import { IActiveEvent, IUser } from '../../models';
import { activeEventService, cryptoService, userService } from '../../services';

export const updateCryptoHandler = async (data: string, activeEventObj: IActiveEvent, userObj: IUser): Promise<void> => {
    const [cryptoName, oldPrice, price] = data.trim().toUpperCase().split('\n');

    const { chatId, _id, crypto_data } = userObj;

    if (!Number(oldPrice) || !Number(price)) {
        await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_ERROR_NUMBER);

        return;
    }

    const findCryptoObjIndex = crypto_data.findIndex(el => el.cryptoName === cryptoName && el.price === +oldPrice);

    if (findCryptoObjIndex === -1) {
        await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_CRYPTO_NOT_FOUND_DB);

        return;
    }

    const foundMarketCrypto = await cryptoService.findOneCryptoByName(cryptoName);

    if (!foundMarketCrypto) {
        await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_CRYPTO_NOT_FOUND_BINANCE);

        return;
    }

    const profitDollar = (+foundMarketCrypto.price - +price).toFixed(3);

    const profitPercent = ((+profitDollar) * 100 / +foundMarketCrypto.price).toFixed(2);

    const border = cryptoService.getCryptoBorder(+profitPercent);

    crypto_data[findCryptoObjIndex] = { cryptoName, price: +price, border };

    await userService.updateUser({ _id }, { crypto_data });

    await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

    await bot.sendMessage(chatId, `Your crypto ${cryptoName} ${oldPrice} changed to ${price}!`);
};
