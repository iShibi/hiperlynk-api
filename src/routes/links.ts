import { Router } from 'express';
import LinkModel from '../schemas/Link.js';
import type { LinkSchemaInterface, LinkModelInterface } from '../interfaces/links';

export const linksRouter = Router();

/**
 * Add a new link object to the database
 *
 * POST /links
 */
linksRouter.post('/', (req, res) => {
  const body: LinkSchemaInterface = req.body;
  if (!body) return res.json('Invalid');
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
linksRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(200).json('Invalid ID');
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
