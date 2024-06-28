import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/User';
import { RegisterUserDto } from 'src/dtos/RegisterUserDTO';
import { UpdateUserDto } from 'src/dtos/UpdateUserDTO';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() registerUserDTO: RegisterUserDto) {
    return this.userService.create(registerUserDTO);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('top-users/:limit')
  async findTopUsersByGameScore(
    @Param('limit') limit: number,
  ): Promise<User[]> {
    return this.userService.findTopUsersByGameScore(limit);
  }

  @Patch(':id/photo')
  updatePhoto(@Param('id') id: string, @Query('photoUrl') photoUrl: string) {
    return this.userService.updatePhoto(+id, photoUrl);
  }

  @Get(':id/friends')
  async showUserFriends(@Param('id') id: number): Promise<User[]> {
    return this.userService.showUserFriends(id);
  }

  @Post(':id/friends')
  async addFriend(
    @Param('id') userId: number,
    @Query('friendId') friendId: number,
  ): Promise<void> {
    return this.userService.addFriend(userId, friendId);
  }

  @Delete(':id/friends')
  async removeFriend(
    @Param('id') userId: number,
    @Query('friendId') friendId: number,
  ): Promise<void> {
    return this.userService.removeFriend(userId, friendId);
  }
}
