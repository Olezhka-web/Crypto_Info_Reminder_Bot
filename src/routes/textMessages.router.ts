import { Message } from 'node-telegram-bot-api';

import * as handler from '../handlers';
import * as middleware from '../middleware';

import { BotCommandsEnum, ErrorMessagesEnum, StatusCodesEnum } from '../constants';
import { ErrorHandler } from '../errors';
import { routeFunctions } from '../utils';

export const textMessagesRouter = async (textMessage: Message): Promise<void> => {

    const { text, chat } = textMessage;

    if (!text || !chat) {
        throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, ErrorMessagesEnum.BOT_ERROR_NO_TEXT_OR_NO_CHAT);
    }

    switch (text) {
        case BotCommandsEnum.START:
            await handler.startHandler(chat);

            break;
        case BotCommandsEnum.HELP:
            await handler.helpHandler(chat);

            break;
        case BotCommandsEnum.CREATE_CRYPTO:
            await routeFunctions(chat,
                middleware.checkIsUserExistsMiddleware,
                middleware.checkIsActiveEventExistsMiddleware,
                handler.createCryptoActionHandler);

            break;
        case BotCommandsEnum.UPDATE_CRYPTO:
            await routeFunctions(chat,
                middleware.checkIsUserExistsMiddleware,
                middleware.checkIsActiveEventExistsMiddleware,
                handler.updateCryptoActionHandler);

            break;
        case BotCommandsEnum.DELETE_CRYPTO:
            await routeFunctions(chat,
                middleware.checkIsUserExistsMiddleware,
                middleware.checkIsActiveEventExistsMiddleware,
                handler.deleteCryptoActionHandler);

            break;
        case BotCommandsEnum.GET_CRYPTO:
            await routeFunctions(chat,
                middleware.checkIsUserExistsMiddleware,
                middleware.checkIsActiveEventExistsMiddleware,
                handler.getCryptoHandler);

            break;
        case BotCommandsEnum.PRICE_PREDICTION_CRYPTO:
            await routeFunctions(chat,
                middleware.checkIsUserExistsMiddleware,
                middleware.checkIsActiveEventExistsMiddleware,
                handler.pricePredictionCryptoHandler);

            break;
        default: {
            await routeFunctions(chat,
                middleware.checkIsUserExistsMiddleware,
                handler.extraBotHandler(text));

            break;
        }
    }
};
