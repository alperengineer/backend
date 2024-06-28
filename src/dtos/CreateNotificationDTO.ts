import { IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean, IsInt } from 'class-validator';
import { NotificationType } from 'src/entities/Notification';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isSeen: boolean;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
