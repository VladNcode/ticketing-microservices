import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import { validateRequest } from '@vnctickets/common';
import { User } from '../models/user';
import { BadRequestError } from '@vnctickets/common';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must provide a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('Email or password are incorrect');
    }

    // Check if passwords match
    if (!(await Password.compare(user.password, password))) {
      throw new BadRequestError('Email or password are incorrect');
    }

    // Generate jwt
    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);

    // Store it on a session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
