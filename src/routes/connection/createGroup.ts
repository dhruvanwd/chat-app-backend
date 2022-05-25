import { Connection } from "../../schema/connection";

import { v4 } from "uuid";
import { Request, Response } from "express";
import { User } from "../../schema/user";
import { IUser } from "../../types";

export default async (req: Request, res: Response) => {
  const { groupName, connectionType, participants } = req.body;
  const initiatorId = (req as any).user._id;

  const contact = await Connection.create({
    participants: [initiatorId, ...participants],
    connectionId: v4(),
    groupName,
    createdBy: initiatorId,
    connectionType,
  });
  const receiverProfiles: IUser[] = [];

  for (const participantId of participants) {
    console.log("participantId: ", participantId);
    const userRes = await User.findOne(
      { _id: participantId },
      { password: 0, __v: 0 }
    );
    if (userRes) {
      receiverProfiles.push(userRes.toJSON());
    }
  }

  res.status(200).send({
    ...contact.toJSON(),
    receiverProfiles,
  });
};
