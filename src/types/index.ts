export interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
  channelName: string;
  avatar?: string;
}

export interface IConnection {
  participants:[string, string];
  connectionId: string;
  createdAt: Date;
  createdBy: string;
}
