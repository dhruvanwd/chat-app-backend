import { Connection } from "../../schema/connection";

import { Request, Response } from "express";
import { User } from "../../schema/user";

// Todo: add global error handler

export default async (req: Request, res: Response) => {
  const user = (req as any).user;
  const contacts = await Connection.find(
    {
      participants: user._id,
    },
    { __v: 0 },
    {}
  );

  const connections = [];
  for (const contact of contacts) {
    const receiverId = contact.participants.filter((id) => id !== user._id);
    const receiverProfile = await User.findOne(
      { _id: receiverId },
      { password: 0, __v: 0 }
    );
    connections.push({
      ...contact.toJSON(),
      receiverProfile: receiverProfile.toJSON(),
    });
  }

  res.status(200).send(connections);
};
