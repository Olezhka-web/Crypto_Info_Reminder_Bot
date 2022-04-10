import { BotCommandsEnum } from './bot-commands.enum';

export const BotResponsesEnum = {
    BOT_RESPONSE_USER_REGISTER: 'Hello! Welcome to the bot! The bot is designed to monitor the crypto, ' +
                                'predict the price of the crypto and ' +
                                'sends notifications when a large Pump or Dump. \n\n' +
                                `Write or click on the ${BotCommandsEnum.HELP} command to get the commands available to you.`,

    BOT_RESPONSE_USER_ALREADY_REGISTERED: 'You are already registered and using the bot. ' +
                                            '\n\nAvailable commands: \n' +
                                            `${BotCommandsEnum.START} \n` +
                                            `${BotCommandsEnum.CREATE_CRYPTO} \n` +
                                            `${BotCommandsEnum.UPDATE_CRYPTO} \n` +
                                            `${BotCommandsEnum.DELETE_CRYPTO} \n` +
                                            `${BotCommandsEnum.GET_CRYPTO} \n` +
                                            `${BotCommandsEnum.PRICE_PREDICTION_CRYPTO} \n` +
                                            `${BotCommandsEnum.HELP} \n`,

    BOT_RESPONSE_USER_NOT_FOUND: `Please register and run the bot ${BotCommandsEnum.START}`,

    BOT_RESPONSE_HELP: 'The bot is designed to monitor the crypto, ' +
                        'predict the price of the crypto and ' +
                        'sends notifications when a large Pump or Dump.' +
                        `\n\n                      <b>Available commands: </b> \n\n` +
                        `${BotCommandsEnum.START} - Start Bot, Registration \n\n` +
                        `${BotCommandsEnum.CREATE_CRYPTO} - Create new your crypto \n\n` +
                        `${BotCommandsEnum.UPDATE_CRYPTO} - Edit your created crypto  \n\n` +
                        `${BotCommandsEnum.DELETE_CRYPTO} - Delete your crypto \n\n` +
                        `${BotCommandsEnum.GET_CRYPTO} - Get all your crypto and compare \n\n` +
                        `${BotCommandsEnum.PRICE_PREDICTION_CRYPTO} - Prediction (pump/dump), based on prices \n\n` +
                        `${BotCommandsEnum.HELP} - Additional Information`,

    BOT_RESPONSE_ACTION_STARTED: 'Please complete the previous action to start a new one!',

    BOT_RESPONSE_ERROR: 'Something Wrong!',

    BOT_RESPONSE_CREATE_CRYPTO_ACTION: 'Write the name and price of your cryptocurrency to create from a new line. ' +
                                            `\n\n                            <b>FOR EXAMPLE: </b>` +
                                `<pre>` +
                                        '\n    ---------------------------' +
                                        '\n    |                         |' +
                                        '\n    |                         |' +
                                        '\n    |         BTCUSDT         |' +
                                        '\n    |         45.4566         |' +
                                        '\n    |                         |' +
                                        '\n    |                         |' +
                                        '\n    ---------------------------' +
                                `</pre>`,

    BOT_RESPONSE_UPDATE_CRYPTO_ACTION: 'Write the unique ID and new price of your cryptocurrency' +
                                        ' to edit from a new line. ' +
                                        `\n\n                            <b>FOR EXAMPLE: </b>` +
                                `<pre>` +
                                        '\n    ---------------------------' +
                                        '\n    |                         |' +
                                        '\n    |                         |' +
                                        '\n    |            1            |' +
                                        '\n    |         38.4566         |' +
                                        '\n    |                         |' +
                                        '\n    |                         |' +
                                        '\n    ---------------------------' +
                                `</pre>`,

    BOT_RESPONSE_DELETE_CRYPTO_ACTION: 'Write the unique ID of your cryptocurrency to delete. ' +
                                        `\n\n                            <b>FOR EXAMPLE: </b>` +
                                `<pre>` +
                                        '\n    ---------------------------' +
                                        '\n    |                         |' +
                                        '\n    |                         |' +
                                        '\n    |            1            |' +
                                        '\n    |                         |' +
                                        '\n    |                         |' +
                                        '\n    ---------------------------' +
                                `</pre>`,

    BOT_RESPONSE_UNKNOWN_COMMAND: 'Unknown command!',

    BOT_RESPONSE_ERROR_NUMBER: 'Incorrect number format!',

    BOT_RESPONSE_CRYPTO_NOT_FOUND_BINANCE: 'No such cryptocurrency was found! Please check the cryptocurrency ' +
                                    'name or try this later.',

    BOT_RESPONSE_CRYPTO_ALREADY_CREATED: 'You have already created such a cryptocurrency, with such a price!',

    BOT_RESPONSE_CRYPTO_NOT_FOUND_BY_ID: 'No such cryptocurrency was found! Please check ID',

    BOT_RESPONSE_NO_CRYPTO: 'You do not have any cryptocurrency!',

    BOT_RESPONSE_GET_CRYPTO_ERROR: 'Error! Try this command later!'
};
