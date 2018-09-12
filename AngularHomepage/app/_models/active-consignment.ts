import { Consignment } from './consignment';
import { PostNordConsignor, PostNordConsignee, PostNordLocation } from './PostNord/index';

export class ActiveConsignment extends Consignment {
    public Content: string;
    public LastSeenCity: string;
    public LastSeenTimeStamp: string;
    public DropOffDate: string;
    public Consignor: PostNordConsignor;
    public Consignee: PostNordConsignee;
    public DropOffLocation: PostNordLocation;
}