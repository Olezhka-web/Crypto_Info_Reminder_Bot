import { ICryptoData } from './cryptoData.interface';

export interface IUser {
    _id: string;
    chatId: number;
    name: string;
    surname: string;
    tag: string;
    crypto_data: ICryptoData[];
    createdAt: Date;
    updatedAt: Date;
}
