import type { Document } from 'mongoose';

export interface UserCredentialsInterface {
  username: string;
  password: string;
}

export interface UserSchemaInterface {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
}

export type UserModelInterface = UserSchemaInterface & Document;
