import { Router } from 'express';
import LinkModel from '../schemas/Link.js';
import { postLinkValidationRules, getLinkByIdValidationRules, validate } from '../validators/links.js';
import type { Request, Response } from 'express';
import type { LinkSchemaInterface, LinkModelInterface } from '../interfaces/links';

export const linksRouter = Router();

/**
 * Add a new link object to the database
 *
 * POST /links
 */
linksRouter.post('/', postLinkValidationRules(), validate, (req: Request, res: Response) => {
  const body: LinkSchemaInterface = req.body;
  const newLinkDoc = new LinkModel({
    name: body.name,
    url: body.url,
    icon: body.icon,
    username: body.username,
  });
  newLinkDoc
    .save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.json(err));
});

/**
 * Get all the link objects from the database
 *
 * GET /links/all
 */
linksRouter.get('/all', (req, res) => {
  LinkModel.find({}, (err: Error, docs: Array<LinkModelInterface>) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (docs.length) {
      return res.status(200).json(docs);
    } else {
      return res.sendStatus(404);
    }
  });
});

/**
 * Get a link object from the database using its ID
 *
 * GET /links/:id
 */
linksRouter.get('/:id', getLinkByIdValidationRules(), validate, (req: Request, res: Response) => {
  const id = req.params.id;
  LinkModel.findOne({ _id: id }, (err: Error, doc: LinkModelInterface) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (doc) {
      return res.status(200).json(doc);
    } else {
      return res.sendStatus(404);
    }
  });
});

/**
 * Delete all the link objects from the database
 *
 * DELETE /links/delete/all
 */
linksRouter.delete('/delete/all', (req, res) => {
  LinkModel.find({}, (err: Error, docs: Array<LinkModelInterface>) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (docs.length) {
      docs.forEach(doc => doc.delete());
      return res.status(200).json(docs);
    } else {
      return res.sendStatus(404);
    }
  });
});

/**
 * Delete a link object using its ID
 *
 * DELETE /links/delete/:id
 */
linksRouter.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(200).json('Invalid ID');
  LinkModel.findOne({ _id: id }, (err: Error, doc: LinkModelInterface) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (doc) {
      doc.delete();
      return res.status(200).json(doc);
    } else {
      return res.sendStatus(404);
    }
  });
});

/**
 * Get all links added by a specific user
 *
 * GET /links/all/:username
 */
linksRouter.get('/all/:username', (req: Request, res: Response) => {
  const username = req.params.username;
  LinkModel.find({ username }, (err: Error, docs: Array<LinkModelInterface>) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (docs.length) {
      return res.status(200).json(docs);
    } else {
      return res.sendStatus(404);
    }
  });
});
