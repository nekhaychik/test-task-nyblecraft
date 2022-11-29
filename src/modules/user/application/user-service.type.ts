import { Status } from '../core';

export interface CreateUserParameters {
  file: Express.Multer.File;
  email: string;
  firstName: string;
  lastName: string;
}

export interface DeleteUserParameters {
  email: string;
}

export interface StatusResult {
  status: Status;
  data?: Error;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface UpdateUserParameters {
  email: string;
  newEmail?: string;
  firstName?: string;
  lastName?: string;
  file?: Express.Multer.File;
  pdf?: Buffer;
}
