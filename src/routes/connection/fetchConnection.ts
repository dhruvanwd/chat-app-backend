import { Connection } from "../../schema/connection";

import { Request, Response } from "express";
import { User } from "../../schema/user";

// Todo: add global error handler

export default async (req: Request, res: Response) => {
  const user = (req as any).user;
  const connectionsList = await Connection.find(
    {
      participants: user._id,
    },
    { __v: 0 },
    {}
  );

  const connections = [];
  for (const contact of connectionsList) {
    if (contact.connectionType === "one-to-one") {
      console.log(contact);
      const [receiverId] = contact.participants.filter((id) => id !== user._id);
      const receiverProfile = await User.findOne(
        { _id: receiverId },
        { password: 0, __v: 0 }
      );
      if (receiverProfile) {
        connections.push({
          ...contact.toJSON(),
          receiverProfile: receiverProfile.toJSON(),
        });
      }
    } else {
      const filteredParticipants = contact.participants.filter(
        (id) => id !== user._id
      );
      const receiverProfiles: any[] = [];
      for (const participantId of filteredParticipants) {
        const userRes = await User.findOne(
          { _id: participantId },
          { password: 0, __v: 0 }
        );
        if (userRes) {
          receiverProfiles.push(userRes.toJSON());
        }
      }
      connections.push({
        ...contact.toJSON(),
        receiverProfiles,
      });
    }
  }

  res.status(200).send(connections);
};
