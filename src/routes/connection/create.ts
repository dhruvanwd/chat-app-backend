import { Contact } from "../../schema/contact";

import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const contact = await Contact.create(req.body);
  res.status(200).send(contact.toJSON());
};
