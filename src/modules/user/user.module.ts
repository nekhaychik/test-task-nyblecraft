import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application';
import { UserDomain } from './domain';
import { UserEntity, UserRepository } from './infrasctructure';
import { UserController } from './presentation';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({
      dest: './images',
    }),
  ],
  controllers: [UserController],
  exports: [UserService, UserDomain],
  providers: [UserEntity, UserRepository, UserDomain, UserService],
})
export class UserModule {}
