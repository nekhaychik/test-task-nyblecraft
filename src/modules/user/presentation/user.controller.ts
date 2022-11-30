import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../application';
import { Status } from '../core';
import {
  CreateUserInput,
  DeleteUserInput,
  GeneratePdfInput,
  GetGeneratedPdfInput,
  GetUserByEmailInput,
  UpdateUserInput,
  UpdateUserParams,
} from './inputs';
import {
  CreateUserResult,
  DeleteUserResult,
  GetUserByEmailResult,
  GetAllUsersResult,
  UpdateUserResult,
  GeneratePdfResult,
  GetGeneratedPdfResult,
} from './results';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/')
  @UseInterceptors(FileInterceptor('file'))
  public async createUser(@UploadedFile() file: Express.Multer.File, @Body() body: CreateUserInput): Promise<CreateUserResult> {
    const result = await this.userService.createUser({ file, ...body });
    return { status: Status.success, data: result };
  }

  @Delete(':email')
  @UseGuards(AuthGuard('jwt'))
  public deleteUser(@Param() params: DeleteUserInput): Promise<DeleteUserResult> {
    return this.userService.deleteUser({ ...params });
  }

  @Get('/get/:email')
  @UseGuards(AuthGuard('jwt'))
  public async getUserByEmail(@Param() params: GetUserByEmailInput): Promise<GetUserByEmailResult> {
    const user = await this.userService.getUserByEmail({ ...params });
    return { status: Status.success, data: user };
  }

  @Get('get-all')
  @UseGuards(AuthGuard('jwt'))
  public async getAllUsers(): Promise<GetAllUsersResult> {
    const users = await this.userService.getAllUsers();
    return { status: Status.success, data: users };
  }

  @Post('update-image/:email')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  public async updateUserImage(
    @Param() params: UpdateUserParams,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateUserResult> {
    return await this.userService.updateUser({ ...params, file });
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  public async updateUser(@Body() body: UpdateUserInput, @Query() query: UpdateUserParams): Promise<UpdateUserResult> {
    console.log(body, query);
    return await this.userService.updateUser({ ...query, ...body });
  }

  @Post('generate-pdf')
  @UseGuards(AuthGuard('jwt'))
  public async generatePdf(@Body() body: GeneratePdfInput): Promise<GeneratePdfResult> {
    return await this.userService.generatePdf({ ...body });
  }

  @Get('get-generated-pdf')
  @UseGuards(AuthGuard('jwt'))
  public async getGeneratedPdf(@Body() body: GetGeneratedPdfInput): Promise<GetGeneratedPdfResult> {
    return await this.userService.createUserPdfFromDB({ ...body });
  }
}
