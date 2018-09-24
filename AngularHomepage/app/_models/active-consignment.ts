import { Consignment } from './consignment';
import { PostNordConsignor, PostNordConsignee, PostNordLocation, PostNordEvent, PostNordService } from './PostNord/index';

export class ActiveConsignment extends Consignment {
    public Content: string;
    public LastSeenCity: string;
    public LastSeenTimeStamp: string;
    public DropOffDate: string;
    public Consignor: PostNordConsignor;
    public Consignee: PostNordConsignee;
    public DropOffLocation: PostNordLocation;
    public Events: Array<PostNordEvent>;
    public Service: PostNordService;
}