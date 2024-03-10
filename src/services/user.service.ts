import UserModel from '@src/models/user.model';
import { omit } from 'lodash';
import Logger from '@src/utils/logging';
import { IUser } from '@src/types/types';

export const createUser = async (
  input: IUser,
): Promise<Omit<IUser, 'password'>> => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), ['password']);
  } catch (err: unknown) {
    if (err instanceof Error) {
      Logger.error(err.message);
    } else {
      Logger.error(`Failed to create user: ${JSON.stringify(err)}`);
    }
    throw new Error(`User creation failed: ${err}`);
  }
};
