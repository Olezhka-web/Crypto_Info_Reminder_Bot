import { Document, Model, model, Schema } from 'mongoose';

import { TableNamesEnum } from '../../constants';
import { IUser } from '../../models';

export type UserType = IUser & Document;

export const UserSchema: Schema<IUser> = new Schema<IUser>({
    chatId: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    tag: {
        type: String,
        unique: true,
        required: true
    },
    crypto_data: [
        {
            cryptoName: String,
            price: Number,
            border: Number
        }
    ],
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

export const UserModel: Model<UserType> = model<UserType>(TableNamesEnum.USERS, UserSchema);
