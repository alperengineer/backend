import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { RegisterUserDto } from 'src/dtos/RegisterUserDTO';
import { UpdateUserDto } from 'src/dtos/UpdateUserDTO';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const newUser = this.userRepository.create(registerUserDto);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    Object.assign(existingUser, updateUserDto);

    return await this.userRepository.save(existingUser);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findTopUsersByGameScore(limit: number): Promise<User[]> {
    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestException('Invalid limit parameter');
    }

    try {
      return this.userRepository.createQueryBuilder('user')
      .orderBy('user.score', 'DESC')
      .limit(10)
      .getMany();
    } catch (error) {
      throw new BadRequestException('An error occurred while fetching the top users');
    }
  }

  async updatePhoto(id: number, photoUrl: string): Promise<User> {
    await this.userRepository.update(id, { photo: photoUrl });
    return this.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async showUserFriends(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    return user?.friends || [];
  }

  async addFriend(userId: number, friendId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    const friend = await this.userRepository.findOne({ where: { id: friendId } });

    if (user && friend && !user.friends.find(f => f.id === friendId)) {
      user.friends.push(friend);
      await this.userRepository.save(user);
    }
  }

  async removeFriend(userId: number, friendId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });

    if (user) {
      user.friends = user.friends.filter(friend => friend.id === friendId);
      console.log(user.friends);
      await this.userRepository.save(user);
    }
  }
}
