export interface CreateParameters {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface DeleteParameters {
  _id: number;
}

export interface FindByEmailParameters {
  email: string;
}

export interface UpdateParameters {
  _id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  pdf?: Buffer;
}
