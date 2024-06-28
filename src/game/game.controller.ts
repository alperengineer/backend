import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from 'src/entities/Game';
import { UpdateGameDto } from 'src/dtos/UpdateGameDTO';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() game: Game) {
    return this.gameService.create(game);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  async updateGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }

  @Get(':gameId/validate-pin')
  async validateGamePin(@Param('gameId') gameId: number, @Query('pin') pin: number) {
    const isValid = await this.gameService.validateGamePin(gameId, pin);
    return { isValid };
  }
}
