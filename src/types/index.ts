export interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
  channelName: string;
  avatar?: string;
}

export interface IConnection {
  participants: [string, string];
  connectionId: string;
  groupAvatar?: string;
  createdAt: Date;
  groupName?: string;
  connectionType: "one-to-one" | "one-to-many" | "many-to-many";
  createdBy: string;
}
