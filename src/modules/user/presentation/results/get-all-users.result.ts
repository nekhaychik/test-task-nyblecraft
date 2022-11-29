import { Status } from '../../core';
import { UserDto } from '../dtos';

export class GetAllUsersResult {
  status: Status;
  data: Error | UserDto[];
}
