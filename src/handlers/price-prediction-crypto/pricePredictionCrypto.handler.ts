import { bot } from '../../create-bot';
import { IUser } from '../../models';

export const pricePredictionCryptoHandler = async (userObj: IUser): Promise<void> => {
    const { chatId } = userObj;

    // TODO CRON - 10 MIN -> [] -> SAVE DB WITH TIME
    // TODO CRON EVERY 4 HOURS -> DELETE FIRST

    // TODO ALL 24 RECORDS

    // TODO -> GET DATA -> COMPARE ALL RECORDS -> First Record VS Last Record

    await bot.sendMessage(chatId, 'At the moment, this command is not working');
};
