import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module'; // 🔥 ADD THIS

@Module({
  imports: [AuthModule], // 🔥 ADD THIS
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }