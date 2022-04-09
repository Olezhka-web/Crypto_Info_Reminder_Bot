import * as cron from 'node-cron';

import { config } from '../config';
import { sendNotification } from './send-notification';

export const cronJobRun = (): void => {
    cron.schedule(config.CRON_JOB_NOTIFICATION_PERIOD, async (): Promise<void> => {
        console.log(`Cron Send Crypto Notification started at ${new Date().toISOString()}`);

        await sendNotification();

        console.log(`Cron Send Crypto Notification finished at ${new Date().toISOString()}`);
    });
};
