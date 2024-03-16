import UserModel from '@src/models/user.model';
import { omit } from 'lodash';
import Logger from '@src/utils/logging';
import { IUser } from '@src/types/types';
import { ErrorCodes } from '@src/errorCodes';

export const create = async (input: IUser): Promise<Partial<IUser>> => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), ['password']);
  } catch (err: unknown) {
    if ((err as any).code === 11000) {
      throw new Error(ErrorCodes.UserAlreadyExists);
    }

    throw new Error(`User creation failed: ${err}`);
  }
};

const getUsers = async (): Promise<IUser[]> => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err: unknown) {
    if (err instanceof Error) {
      Logger.error(err.message);
    }
    throw new Error(`User getting failed: ${err}`);
  }
};

export const userService = {
  create,
  getUsers,
};
