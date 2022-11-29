import { Status } from '../core';


export interface CreateUserParameters {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface DeleteUserParameters {
  _id: number;
}

export interface StatusResult {
  status: Status;
  data?: Error;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface UpdateUserParameters {
  _id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  pdf?: Buffer;
}
