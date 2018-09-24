import { PostNordAddress, PostNordCustomer, PostNordContact, PostNordLocation } from './index';

export class PostNordEvent{
    public eventTime: Date;
    public eventCode: string;
    public status: string;
    public eventDescription: string;
    public localEventCode: string;
    public scanUserId: string;
    public location: PostNordLocation
}

export class PostNordService {
    public code: string;
    public sourceSystem: string;
    public name: string;
    public articleNumber: string;
}