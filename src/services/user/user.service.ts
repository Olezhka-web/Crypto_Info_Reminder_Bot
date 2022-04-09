import { UserModel } from '../../database';
import { IUser } from '../../models';

class UserService {
    createUser(user: Partial<IUser>): Promise<IUser> {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }

    deleteUser(id: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(id).exec();
    }

    findOneUser(findObj: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findOne(findObj).exec();
    }

    findAllUsers(findObj: Partial<IUser>): Promise<IUser[] | []> {
        return UserModel.find(findObj).exec();
    }

    updateUser(id: Partial<IUser>, user: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }
}

export const userService = new UserService();
