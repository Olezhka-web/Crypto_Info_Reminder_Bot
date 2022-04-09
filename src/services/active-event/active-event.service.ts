import { ActiveEventModel } from '../../database';
import { IActiveEvent } from '../../models';

class ActiveEventService {
    createActiveEvent(actionEventObj: Partial<IActiveEvent>): Promise<IActiveEvent> {
        return ActiveEventModel.create(actionEventObj);
    }

    deleteActiveEvent(id: Partial<IActiveEvent>): Promise<IActiveEvent | null> {
        return ActiveEventModel.findByIdAndDelete(id).exec();
    }

    findActiveEvent(findObj: Partial<IActiveEvent>): Promise<IActiveEvent | null> {
        return ActiveEventModel.findOne(findObj).exec();
    }
}

export const activeEventService = new ActiveEventService();
