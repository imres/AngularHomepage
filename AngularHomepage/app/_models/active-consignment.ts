import { Consignment } from './consignment';
import { PostNordConsignor, PostNordConsignee, PostNordLocation, PostNordEvent, PostNordService } from './PostNord/index';
import { PostNordWidth } from './PostNord/postnord-width';
import { PostNordHeight } from './PostNord/postnord-height';
import { PostNordWeight } from './PostNord/postnord-weight';
import { PostNordLength } from './PostNord/postnord-length';

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
    public Width: PostNordWidth;
    public Height: PostNordHeight;
    public Weight: PostNordWeight;
    public Lenght: PostNordLength;
}