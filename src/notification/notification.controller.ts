import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from 'src/entities/Notification';
import { CreateNotificationDto } from 'src/dtos/CreateNotificationDTO';
import { UpdateNotificationDto } from 'src/dtos/UpdateNotificationDTO';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDTO: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDTO);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  async updateNotification(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.notificationService.findByUserId(+userId);
  }

  @Patch('deactivate/user/:userId')
  deactivateAllByUserId(@Param('userId') userId: string) {
    return this.notificationService.deactivateAllByUserId(+userId);
  }
}
