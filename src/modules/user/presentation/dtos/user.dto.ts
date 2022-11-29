export class UserDto {
  _id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  pdf?: Buffer;
}
