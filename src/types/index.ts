export interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
  channelName: string;
  avatar?: string;
}

export interface IConnection {
  initiatorId: string;
  receiverId: string;
  receiverChannelName: string;
}
