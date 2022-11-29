import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../application';
import { Status } from '../core';
import { CreateUserInput, DeleteUserInput, GetUserByEmailInput, UpdateUserInput, UpdateUserParams } from './inputs';
import { CreateUserResult, DeleteUserResult, GetUserByEmailResult, GetAllUsersResult, UpdateUserResult } from './results';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/')
  @UseInterceptors(FileInterceptor('file'))
  public async createUser(@UploadedFile() file: Express.Multer.File, @Body() body: CreateUserInput): Promise<CreateUserResult> {
    try {
      const result = await this.userService.createUser({ file, ...body });
      return { status: Status.success, data: result };
    }
    catch (err) {
      throw err;
    }
  }

  @Delete(':email')
  public deleteUser(@Param() params: DeleteUserInput): Promise<DeleteUserResult> {
    return this.userService.deleteUser({ ...params });
  }

  @Get(':email')
  public async getUserByEmail(@Param() params: GetUserByEmailInput): Promise<GetUserByEmailResult> {
    try {
      const { email } = params;

      const user = await this.userService.getUserByEmail({ email });

      return { status: Status.success, data: user };
    }
    catch (err) {
      return { status: Status.error, data: err };
    }
  }

  @Get('/all')
  public async getAllUsers(): Promise<GetAllUsersResult> {
    try {
      const users = await this.userService.getAllUsers();

      return { status: Status.success, data: users };
    }
    catch (err) {
      return { status: Status.error, data: err };
    }
  }

  @Post(':email')
  @UseInterceptors(FileInterceptor('file'))
  public async updateUser(
    @Param() params: UpdateUserParams,
    @Body() body: UpdateUserInput,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<UpdateUserResult> {
    return await this.userService.updateUser({ ...params, ...body, file });
  }

}
