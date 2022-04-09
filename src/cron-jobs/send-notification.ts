import { bot } from '../create-bot';
import { cryptoService, userService } from '../services';

export const sendNotification = async (): Promise<void> => {
    const users = await userService.findAllUsers({});

    const cryptoMarket = await cryptoService.findAllCryptoInfo();

    for (const user of users) {
        const { _id, chatId, crypto_data } = user;

        if (crypto_data.length === 0) {
            continue;
        }

        let result = '';

        for (const [index, cryptoObj] of crypto_data.entries()) {
            const foundMarketCrypto = cryptoMarket.find((crypto) => crypto.symbol === cryptoObj.cryptoName);

            if (!foundMarketCrypto) {
                continue;
            }

            const profitDollar = (+foundMarketCrypto.price - cryptoObj.price).toFixed(3);

            const profitPercent = ((+profitDollar) * 100 / +foundMarketCrypto.price).toFixed(2);

            const border = cryptoService.getCryptoBorder(+profitPercent);

            if (+border === cryptoObj.border) {
                continue;
            }

            result += '\n\n';
            result += `\nCrypro Name: ${cryptoObj.cryptoName}`;
            result += `\nYour Price: ${cryptoObj.price.toFixed(3)}`;
            result += `\nMarket Price: ${(+foundMarketCrypto.price).toFixed(3)}`;
            result += `\nProfit: ${profitDollar}$ / ${profitPercent}%`;
            result += `\nStatus: ${+profitDollar > 0 ? '\u{1F4C8}' : '\u{1F4C9}' }`;

            crypto_data[index] = { cryptoName: cryptoObj.cryptoName, price: cryptoObj.price, border };

            await userService.updateUser({ _id }, { crypto_data });
        }

        if (result) {
            await bot.sendMessage(chatId, result);
        }
    }
};
