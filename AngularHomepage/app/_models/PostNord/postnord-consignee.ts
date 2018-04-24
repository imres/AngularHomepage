import { PostNordAddress, PostNordCustomer, PostNordContact } from './index';

export class PostNordConsignee{
    public name: string;
    public address: PostNordAddress;
    public customer: PostNordCustomer;
    public contact: PostNordContact;
}