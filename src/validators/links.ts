import { checkSchema, validationResult } from 'express-validator';
import type { ValidationChain } from 'express-validator';
import type { Request, Response } from 'express';

export const postLinkValidationRules = (): Array<ValidationChain> => {
  return checkSchema({
    name: {
      in: ['body'],
      notEmpty: {
        options: {
          ignore_whitespace: true,
        },
        errorMessage: 'name cannot be empty',
      },
    },
    url: {
      in: ['body'],
      notEmpty: {
        options: {
          ignore_whitespace: true,
        },
        errorMessage: 'url cannot be empty',
      },
    },
    username: {
      in: ['body'],
      notEmpty: {
        options: {
          ignore_whitespace: true,
        },
        errorMessage: 'username cannot be empty',
      },
    },
  });
};

export const getLinkByIdValidationRules = (): Array<ValidationChain> => {
  return checkSchema({
    id: {
      in: 'params',
      matches: {
        options: /^[a-f\d]{24}$/i,
        errorMessage: 'id is not valid',
      },
    },
  });
};

// @ts-ignore
export const validate = (req: Request, res: Response, next): any => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
