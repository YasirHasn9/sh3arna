import UserModel from '@src/models/user.model';
import { omit } from 'lodash';
import Logger from '@src/utils/logging';
import { IUser } from '@src/types/types';

export const create = async (input: IUser): Promise<Partial<IUser>> => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), ['password']);
  } catch (err: unknown) {
    // maybe here where I can find the type of error I need when creating a new user
    if (err instanceof Error) {
      Logger.error(err.message);
    } else {
      Logger.error(`Failed to create user: ${JSON.stringify(err)}`);
    }
    throw new Error(`User creation failed: ${(err as any).code}`);
  }
};

const getUsers = async (): Promise<IUser[]> => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err: unknown) {
    if (err instanceof Error) {
      Logger.error(err.message);
    } else {
      Logger.error(`Failed to create user: ${JSON.stringify(err)}`);
    }
    throw new Error(`User creation failed: ${err}`);
  }
};

export const userService = {
  create,
  getUsers,
};
