import { bot } from '../../create-bot';
import { BotResponsesEnum } from '../../constants';
import { IActiveEvent, IUser } from '../../models';
import { activeEventService, cryptoService, userService } from '../../services';

export const createCryptoHandler = async (data: string, activeEventObj: IActiveEvent, userObj: IUser): Promise<void> => {
    const [cryptoName, price] = data.trim().toUpperCase().split('\n');

    const { chatId, _id, crypto_data } = userObj;

    if (!Number(price)) {
        await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_ERROR_NUMBER);

        return;
    }

    const checkIfCryptoExist = crypto_data.find(el => el.cryptoName === cryptoName && el.price === +price);

    if (checkIfCryptoExist) {
        await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_CRYPTO_ALREADY_CREATED);

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

    await userService.updateUser({ _id }, { crypto_data: [...crypto_data, { cryptoName, price: +price, border }] });

    await activeEventService.deleteActiveEvent({ _id: activeEventObj._id });

    await bot.sendMessage(chatId, `Your crypto ${cryptoName} ${price} created!`);
};
