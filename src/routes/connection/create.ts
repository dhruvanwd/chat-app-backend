import { Connection } from "../../schema/connection";

import { v4 } from "uuid";
import { Request, Response } from "express";
import { User } from "../../schema/user";

export default async (req: Request, res: Response) => {
  // Here request body is of type { userObj: {} } and we are extracting userObj from it.
  const { userObj,connectionType } = req.body;
  const userRes = await User.findOne(userObj, { password: 0, __v: 0 });

  const initiatorId = (req as any).user._id;
  console.log(userObj);
  console.log(initiatorId);

  const contact = await Connection.create({
    participants: [initiatorId, userRes._id],
    connectionId: v4(),
    createdBy: initiatorId,
    connectionType
  });
  res.status(200).send({
    ...contact.toJSON(),
    receiverProfile: userRes.toJSON(),
  });
};
