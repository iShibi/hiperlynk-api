import { Router } from 'express';
import LinkModel from '../schemas/Link.js';
import type { LinkSchemaInterface } from '../interfaces/links';

export const linksRouter = Router();

linksRouter.post('/', (req, res) => {
  const body: LinkSchemaInterface = req.body;
  const newLinkDoc = new LinkModel({
    name: body.name,
    url: body.url,
    icon: body.icon,
  });
  newLinkDoc
    .save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.json(err));
});
