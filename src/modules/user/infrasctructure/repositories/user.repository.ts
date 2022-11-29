import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from '../entities';
import { CreateParameters, DeleteParameters, FindByEmailParameters, UpdateParameters } from '../repository-interfaces';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  public async create({ email, firstName, lastName, image }: CreateParameters): Promise<UserEntity> {
    return this.userRepository.save({ email, firstName, lastName, image });
  }

  public delete({ _id }: DeleteParameters): Promise<DeleteResult> {
    return this.userRepository.delete({ _id })
  }

  public findByEmail({ email }: FindByEmailParameters): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  public findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public update({ _id, email, firstName, lastName, image, pdf }: UpdateParameters): Promise<UpdateResult> {
    return this.userRepository.update({ _id }, { email, firstName, lastName, image, pdf });
  }
}
