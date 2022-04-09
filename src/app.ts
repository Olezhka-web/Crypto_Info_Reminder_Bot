import { NextFunction, Request, Response } from 'express';

import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { Message } from 'node-telegram-bot-api';

dotenv.config();

import { bot } from './create-bot';
import { config } from './config';
import { ErrorMessagesEnum, StatusCodesEnum } from './constants';
import { cronJobRun } from './cron-jobs';
import { ErrorHandler } from './errors';
import { textMessagesRouter } from './routes';

const app = express();

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Failed Connection To MongoDb');
    }
});

app.use(cors({ origin: _configureCors }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('*', _notFoundError);
app.use(_mainErrorHandler);

bot.on('text', async (textMessage: Message): Promise<void> => {
    try {
        await textMessagesRouter(textMessage);
    } catch (err) {
        console.log((err as ErrorHandler).status, (err as ErrorHandler).message);
    }
});

cronJobRun();

app.listen(config.PORT, () => {
    console.log(`App is ready on port ${config.PORT}`);
});

function _notFoundError(err: any, req: Request, res: Response, next: NextFunction) {
    next({
        status: err.status || StatusCodesEnum.NOT_FOUND,
        message: err.message || 'Route not found'
    });
}

function _mainErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res
        .status(err.status || StatusCodesEnum.SERVER)
        .json({
            message: err.message || 'Unknown Error',
            code: err.code || 0
        });
}

function _configureCors(origin: any, callback: any) {
    const whiteList = config.ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(StatusCodesEnum.FORBIDDEN, ErrorMessagesEnum.CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
