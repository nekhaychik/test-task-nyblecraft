import { UserDto } from '../dtos';
import { Status } from '../../core';

export class CreateUserResult {
  status: Status;
  data: Error | UserDto;
}
