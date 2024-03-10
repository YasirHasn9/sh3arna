import { Document } from 'mongoose';
interface IUser extends Document {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export { IUser };
