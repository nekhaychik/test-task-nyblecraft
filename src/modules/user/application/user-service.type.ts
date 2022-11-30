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

export interface generatePdfParameters {
  email: string;
}

export interface StatusWithDataResult {
  status: Status;
  data: {
    pdfPath: string;
  };
}

export interface CreateUserPdfFromDBParameters {
  email: string;
}

export interface WriteFileSyncParameters {
  path: string;
  buffer: Buffer;
  permission?: string | number;
}
