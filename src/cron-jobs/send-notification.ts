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

        const sortedCryptoData = crypto_data.sort((a, b) => a.cryptoNumber - b.cryptoNumber);

        let result = '';

        for (const [index, cryptoObj] of sortedCryptoData.entries()) {
            const { cryptoNumber, cryptoName, price, border } = cryptoObj;

            const foundMarketCrypto = cryptoMarket.find((crypto) => crypto.symbol === cryptoName);

            if (!foundMarketCrypto) {
                continue;
            }

            const profitDollar = (+foundMarketCrypto.price - price).toFixed(3);

            const profitPercent = ((+profitDollar) * 100 / +foundMarketCrypto.price).toFixed(2);

            const newBorder = cryptoService.getCryptoBorder(+profitPercent);

            if (+newBorder === border) {
                continue;
            }

            result += '\n\n';
            result += `\nCryptoID: ${cryptoObj.cryptoNumber}`;
            result += `\nCrypro Name: ${cryptoObj.cryptoName}`;
            result += `\nYour Price: ${cryptoObj.price.toFixed(3)}`;
            result += `\nMarket Price: ${(+foundMarketCrypto.price).toFixed(3)}`;
            result += `\nProfit: ${profitDollar}$ / ${profitPercent}%`;
            result += `\nStatus: ${+profitDollar > 0 ? '\u{1F4C8}' : '\u{1F4C9}' }`;
            result += `\nChanged border: from ${border}% to ${newBorder}%`;

            sortedCryptoData[index] = { cryptoNumber, cryptoName, price, border: newBorder };

            await userService.updateUser({ _id }, { crypto_data: sortedCryptoData });
        }

        if (result) {
            await bot.sendMessage(chatId, `CRYPTO NOTIFICATION MESSAGES ${result}`);
        }
    }
};
