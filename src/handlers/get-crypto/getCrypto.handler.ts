import { bot } from '../../create-bot';
import { BotResponsesEnum } from '../../constants';
import { IUser } from '../../models';
import { cryptoService } from '../../services';

export const getCryptoHandler = async (userObj: IUser): Promise<void> => {
    const { chatId, crypto_data } = userObj;

    if (crypto_data.length === 0) {
        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_NO_CRYPTO);

        return;
    }

    const sortedCryptoData = crypto_data.sort((a, b) => a.cryptoName !== b.cryptoName ? a.cryptoName < b.cryptoName ? -1 : 1 : 0);

    const cryptoDataMessage = await cryptoService.findAndGetCryptoInfo(sortedCryptoData);

    if (!cryptoDataMessage) {
        await bot.sendMessage(chatId, BotResponsesEnum.BOT_RESPONSE_NO_CRYPTO);

        return;
    }

    await bot.sendMessage(chatId, cryptoDataMessage);
};
