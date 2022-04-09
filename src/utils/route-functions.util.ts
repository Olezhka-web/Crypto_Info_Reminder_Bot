import { Chat } from 'node-telegram-bot-api';

import { ErrorHandler } from '../errors';

export const routeFunctions = async (chat: Chat, ...handlers: ((props: any) => any)[]): Promise<void> => {
    try {
        await handlers.reduce(async (acc, cur) => {
            const accValue = await acc;

            return cur(accValue);
        }, chat as any);

    } catch (err) {
        console.log((err as ErrorHandler).status, (err as ErrorHandler).message);
    }
};
