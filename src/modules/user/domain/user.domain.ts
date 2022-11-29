import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrasctructure';
import { UserDto } from '../presentation';
import { Status } from '../core';
import { DeleteUserParameters, GetUserByEmailParameters, StatusResult, UpdateUserParameters } from './user-domain.type';

@Injectable()
export class UserDomain {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser({ email, firstName, lastName, image }): Promise<UserDto> {
    try {
      const user = await this.userRepository.create({ email, firstName, lastName, image });
      return user;
    }
    catch (err) {
      throw new Error(err);
    }
  }

  public async deleteUser({ _id }: DeleteUserParameters): Promise<StatusResult> {
    try {
      await this.userRepository.delete({ _id });
      return { status: Status.success };
    }
    catch (err) {
      return { status: Status.error, data: err };
    }
  }

  public async getUserByEmail({ email }: GetUserByEmailParameters): Promise<UserDto> {
    try {
      const user = await this.userRepository.findByEmail({ email });
      return user;
    }
    catch (err) {
      throw new Error(err);
    }
  }

  public async getAllUsers(): Promise<UserDto[]> {

      const users = await this.userRepository.findAll();
      return users;

  }

  public async updateUser({
    _id,
    email,
    firstName,
    lastName,
    image,
    pdf,
  }: UpdateUserParameters): Promise<StatusResult> {
    try {
      await this.userRepository.update({ _id, email, firstName, lastName, image, pdf });
      return { status: Status.success };
    }
    catch (err) {
      return { status: Status.error, data: err };
    }
  }
}
