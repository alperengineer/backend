import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGameDto } from 'src/dtos/UpdateGameDTO';
import { Game } from 'src/entities/Game';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  findOne(id: number): Promise<Game> {
    return this.gameRepository.findOne({ where: { id } });
  }

  create(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const existingGame = await this.gameRepository.findOneBy({ id });

    if (!existingGame) {
      throw new NotFoundException('Game not found');
    }

    Object.assign(existingGame, updateGameDto);

    return await this.gameRepository.save(existingGame);
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async validateGamePin(gameId: number, pin: number): Promise<boolean> {
    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) {
      throw new Error('Game not found');
    }

    return game.PIN == pin;
  }
}
