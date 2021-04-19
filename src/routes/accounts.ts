import { Router } from 'express';
import UserModel from '../schemas/Account.js';
import type { Request, Response } from 'express';
import type { UserSchemaInterface, UserModelInterface, UserCredentialsInterface } from '../interfaces/accounts';

export const accountsRouter = Router();

/**
 * Create a new account for a user
 *
 * POST /accounts/create
 */
accountsRouter.post('/create', (req: Request, res: Response) => {
  const body: UserSchemaInterface = req.body;
  UserModel.findOne({ username: body.username }, (err: Error, doc: UserModelInterface) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (doc) {
      return res.json('a user with this username already exists');
    } else {
      // TODO: hash the password before saving it
      const newUserDoc = new UserModel({
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        password: body.password,
        email: body.email,
      });
      newUserDoc
        .save()
        .then(doc => res.json(doc))
        .catch(err => res.json(err));
    }
  });
});

/**
 * Get whole user object of a user using username and password
 *
 * POST /accounts/users
 */
accountsRouter.post('/users', (req: Request, res: Response) => {
  const body: UserCredentialsInterface = req.body;
  UserModel.findOne({ username: body.username, password: body.password }, (err: Error, doc: UserModelInterface) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (doc) {
      return res.json(doc);
    } else {
      return res.json('no such user exists');
    }
  });
});
