import { Connection } from "../../schema/connection";

import { Request, Response } from "express";

// Todo: add global error handler

export default async (req: Request, res: Response) => {
  console.log("user", (req as any).user);
  const filter = req.query;
  const contacts = await Connection.find(filter, null, {});
  res.status(200).send(contacts);
};
