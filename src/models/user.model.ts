import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '@src/types/types';
import config from 'config';

const saltRounds = config.get<number>('saltRounds');

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const user = model<IUser>('User', userSchema);

export default user;
