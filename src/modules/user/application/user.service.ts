import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDomain } from '../domain';
import { UserDto } from '../presentation';
import {
  CreateUserParameters,
  DeleteUserParameters,
  StatusResult,
  GetUserByEmailParameters,
  UpdateUserParameters,
} from './user-service.type';

@Injectable()
export class UserService {
  constructor(private readonly userDomain: UserDomain) {}

  public async createUser({ email, firstName, lastName, file }: CreateUserParameters): Promise<UserDto> {
    try {
      const image = file.path;

      let user = await this.userDomain.getUserByEmail({ email });

      if (user) {
        throw new BadRequestException('User with this email already exist');
      }

      user = await this.userDomain.createUser({ email, firstName, lastName, image });

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async deleteUser({ email }: DeleteUserParameters): Promise<StatusResult> {
    try {
      const user = await this.userDomain.getUserByEmail({ email });

      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      return await this.userDomain.deleteUser({ _id: user._id });
    } catch (err) {
      throw err;
    }
  }

  public async getUserByEmail({ email }: GetUserByEmailParameters): Promise<UserDto> {
    try {
      const user = await this.userDomain.getUserByEmail({ email });

      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async getAllUsers(): Promise<UserDto[]> {
    return await this.userDomain.getAllUsers();
  }

  public async updateUser({ email, newEmail, firstName, lastName, file, pdf }: UpdateUserParameters): Promise<StatusResult> {
    try {
      const user = await this.userDomain.getUserByEmail({ email });

      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      return await this.userDomain.updateUser({ _id: user._id, email: newEmail, firstName, lastName, image: file?.path, pdf });
    } catch (err) {
      throw new Error(err);
    }
  }
}
