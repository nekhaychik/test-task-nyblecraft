import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthService } from './allpication';
import { AuthController } from './presentation';
import { JwtStrategy } from './utils';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
