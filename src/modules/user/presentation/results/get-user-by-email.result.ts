import { Status } from '../../core';
import { UserDto } from '../dtos';

export class GetUserByEmailResult {
  status: Status;
  data: Error | UserDto;
}
