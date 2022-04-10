import axios from 'axios';

import { config } from '../../config';
import { BotResponsesEnum } from '../../constants';
import { ICryptoData } from '../../models';

class CryptoService {
    findOneCryptoByName(cryptoName: string): Promise<{ symbol: string, price: string }> {
        return axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptoName}`)
            .then(value => value.data || null)
            .catch(() => null);
    }

    findAllCryptoInfo(): Promise<{ symbol: string, price: string }[]> {
        return axios.get(`https://api.binance.com/api/v3/ticker/price`)
            .then(value => value.data || [])
            .catch(() => null);
    }

    async findAndGetCryptoInfo(cryptoDataArr: ICryptoData[]): Promise<string> {
        let result = '';

        const cryptoNameArr = [...new Set(cryptoDataArr.map(el => el.cryptoName))];

        const cryptoInfoArr: any[] | null = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbols=${JSON.stringify(cryptoNameArr)}`)
            .then(value => value.data || [])
            .catch(() => null);

        if (!cryptoInfoArr) {
            return BotResponsesEnum.BOT_RESPONSE_GET_CRYPTO_ERROR;
        }

        if (cryptoInfoArr.length === 0) {
            return result;
        }

        const cryptoFullArr = cryptoDataArr.map((cryptoDataObj) => {
            const foundCrypto = cryptoInfoArr.find((el: { symbol: string; price: string }) => el.symbol === cryptoDataObj.cryptoName);

            const profitDollar = (+foundCrypto.price - cryptoDataObj.price).toFixed(3);

            const profitPercent = ((+profitDollar) * 100 / +foundCrypto.price).toFixed(2);

            return {
                cryptoNumber: cryptoDataObj.cryptoNumber,
                cryptoName: cryptoDataObj.cryptoName,
                price: cryptoDataObj.price.toFixed(3),
                marketPrice: (+foundCrypto.price).toFixed(3),
                profit: `${profitDollar}$ / ${profitPercent}%`,
                status: `${+profitDollar > 0 ? '\u{1F4C8}' : '\u{1F4C9}' }`
            };
        });

        for (const cryptoObj of cryptoFullArr) {
            result += '\n\n';
            result += `\nCryptoID: ${cryptoObj.cryptoNumber}`;
            result += `\nCrypto Name: ${cryptoObj.cryptoName}`;
            result += `\nYour Price: ${cryptoObj.price}`;
            result += `\nMarket Price: ${cryptoObj.marketPrice}`;
            result += `\nProfit: ${cryptoObj.profit}`;
            result += `\nStatus: ${cryptoObj.status}`;
        }

        return result;
    }

    getCryptoBorder(profitPercent: number): number {
        return `${
            profitPercent >= 0
                ?
                config.CRYPTO_POSITIVE_BORDERS_NOTIFICATION
                :
                config.CRYPTO_NEGATIVE_BORDERS_NOTIFICATION
        }`.split(';').reduce((acc, cur) => {
            const lowerBorder = acc;
            const upperBorder = parseInt(cur, 10);

            if (upperBorder >= 0 && lowerBorder <= profitPercent && profitPercent < upperBorder) {
                return lowerBorder;
            }

            if (upperBorder <= 0 && lowerBorder >= profitPercent && profitPercent > upperBorder) {
                return lowerBorder;
            }

            return upperBorder;
        }, 0);
    }
}

export const cryptoService = new CryptoService();
