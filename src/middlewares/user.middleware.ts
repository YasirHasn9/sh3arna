import { IUser } from '@src/types/types';
import Joi from 'joi';
import Logger from '@src/utils/logging';

import { NextFunction, Request, Response } from 'express';

// Middleware to validate user inputs
const validateUserInputs = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  const body = req.body;
  const { error } = validateUser(body);
  if (error) {
    Logger.error(`Validation error: ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
  next();
};

// Joi schema for user validation
const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  firstName: Joi.string().min(3).max(30).optional(),
  lastName: Joi.string().min(3).max(30).optional(),
});
// Function to validate a user object against the schema
function validateUser(user: IUser): Joi.ValidationResult {
  return userValidationSchema.validate(user);
}
export const userValidation = {
  validateUserInputs,
};
