import { Connection } from "../../schema/connection";

import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const connection = req.body;
  const connectionId = req.params._id;
  const updatedConnectionResp = await Connection.findByIdAndUpdate(
    connectionId,
    {
      $set: connection,
    },
    { new: true, upsert: true }
  );
  res.status(200).send(updatedConnectionResp.toJSON());
};
