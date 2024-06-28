import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from 'src/entities/Notification';
import { User } from 'src/entities/User';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User]), UserModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
