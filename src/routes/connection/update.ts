import { Contact } from "../../schema/contact";

import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const contact = req.body;
  const contactId = req.params._id;
  const updatedContactResp = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: contact,
    },
    { new: true, upsert: true }
  );
  res.status(200).send(updatedContactResp.toJSON());
};
