import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from 'src/dtos/CreateNotificationDTO';
import { UpdateNotificationDto } from 'src/dtos/UpdateNotificationDTO';
import { Notification } from 'src/entities/Notification';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  findOne(id: number): Promise<Notification> {
    return this.notificationRepository.findOne({ where: { id } });
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const user = await this.userRepository.findOneBy({ id: createNotificationDto.userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const notification = this.notificationRepository.create({ ...createNotificationDto, user });
    return await this.notificationRepository.save(notification);
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const existingNotification = await this.notificationRepository.findOneBy({ id });

    if (!existingNotification) {
      throw new NotFoundException('Notification not found');
    }

    if (updateNotificationDto.userId) {
      const user = await this.userRepository.findOneBy({ id: updateNotificationDto.userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      existingNotification.user = user;
    }

    Object.assign(existingNotification, updateNotificationDto);

    return await this.notificationRepository.save(existingNotification);
  }

  async remove(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async deactivateAllByUserId(userId: number): Promise<void> {
    const notifications = await this.notificationRepository.find({ where: { user: { id: userId } } });

    if (notifications.length === 0) {
      throw new NotFoundException('No notifications found for the user');
    }

    for (const notification of notifications) {
      notification.isActive = false;
    }

    await this.notificationRepository.save(notifications);
  }
}