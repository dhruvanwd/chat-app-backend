import { Connection } from "../../schema/connection";

import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  // Here request body is of type { userObj: {} } and we are extracting userObj from it.
  const contact = await Connection.create(req.body);
  res.status(200).send(contact.toJSON());
};
