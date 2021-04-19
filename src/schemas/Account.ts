import mongoose from 'mongoose';
import type { UserModelInterface } from '../interfaces/accounts';

const UserSchema: mongoose.Schema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<UserModelInterface>('users', UserSchema);
