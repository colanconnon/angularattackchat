import {MessageItem} from './messageitem';
export class ConversationItem {
    public id : number;
    public conversationItemText : string;
    public conversationItemTitle: string;
    public messages: Array<MessageItem>;
    public selected: boolean;
}   