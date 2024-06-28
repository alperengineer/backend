import { IsOptional, IsString, IsEnum, IsBoolean, IsInt } from 'class-validator';
import { NotificationType } from 'src/entities/Notification';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(NotificationType)
  notificationType?: NotificationType;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isSeen?: boolean;

  @IsOptional()
  @IsInt()
  userId?: number;
}
