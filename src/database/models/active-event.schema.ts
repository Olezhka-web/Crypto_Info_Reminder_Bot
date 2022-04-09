import { Document, Model, model, Schema } from 'mongoose';

import { TableNamesEnum } from '../../constants';
import { IActiveEvent } from '../../models';

export type ActiveEventType = IActiveEvent & Document;

export const ActiveEventSchema: Schema<IActiveEvent> = new Schema<IActiveEvent>({
    activeEvent: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        ref: TableNamesEnum.USERS
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date()
    }
}, {
    timestamps: true
});

export const ActiveEventModel: Model<ActiveEventType> = model<ActiveEventType>(TableNamesEnum.ACTIVE_EVENT, ActiveEventSchema);
