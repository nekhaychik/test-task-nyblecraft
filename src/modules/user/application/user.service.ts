import * as fs from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDomain } from '../domain';
import { UserDto } from '../presentation';
import { Status } from '../core';
import {
  CreateUserParameters,
  DeleteUserParameters,
  StatusResult,
  GetUserByEmailParameters,
  UpdateUserParameters,
  generatePdfParameters,
  CreateUserPdfFromDBParameters,
  WriteFileSyncParameters,
  StatusWithDataResult,
} from './user-service.type';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFGenerator = require('pdfkit');

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

  public async generatePdf({ email }: generatePdfParameters): Promise<StatusResult> {
    try {
      const user = await this.userDomain.getUserByEmail({ email });

      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      const pdf = new PDFGenerator();
      const image = user.image.split('/')[1].split('.')[0];

      pdf.pipe(fs.createWriteStream(`${user.firstName + user.lastName + image}.pdf`));
      pdf.text(`User Name: ${user.firstName} ${user.lastName}; Image path: ${user.image}`);
      pdf.end();

      pdf.on('end', async () => {
        fs.readFile(`${user.firstName + user.lastName + image}.pdf`, async (err, chunk) => {
          if (err) {
            throw new Error(err.message);
          }

          await this.userDomain.updateUser({ _id: user._id, pdf: chunk });
        });

        fs.rm(`${user.firstName + user.lastName + image}.pdf`, (err) => {
          if (err) {
            throw new Error(err.message);
          }
        });
      });

      return { status: Status.success };
    } catch (err) {
      throw err;
    }
  }

  public async createUserPdfFromDB({ email }: CreateUserPdfFromDBParameters): Promise<StatusWithDataResult> {
    try {
      const user = await this.userDomain.getUserByEmail({ email });

      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      if (!user.pdf) {
        throw new BadRequestException('User does not have pdf file');
      }

      const pdfName = user.firstName + user.lastName + user.image.split('/')[1].split('.')[0];

      const writeFileSync = ({ path, buffer, permission }: WriteFileSyncParameters): void => {
        permission = permission || 438; // 0666
        let fileDescriptor: number;
        const dirname = 'filesPdf/';

        try {
          fileDescriptor = fs.openSync(dirname + path, 'w', permission);
        } catch (err) {
          fs.chmodSync(dirname + path, permission);
          fileDescriptor = fs.openSync(dirname + path, 'w', permission);
        }

        if (fileDescriptor) {
          fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
          fs.closeSync(fileDescriptor);
        }
      };

      writeFileSync({ path: pdfName + '.pdf', buffer: user.pdf });

      return { status: Status.success, data: { pdfPath: 'filesPDF/' + pdfName + '.pdf' } };
    } catch (err) {
      throw err;
    }
  }
}
