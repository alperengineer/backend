import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateQuestionDto } from 'src/dtos/UpdateQuestionDTO';
import { Question } from 'src/entities/Question';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionRepository.findOne({ where: { id } });
  }

  create(question: Question): Promise<Question> {
    return this.questionRepository.save(question);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const existingQuestion = await this.questionRepository.findOneBy({ id });

    if (!existingQuestion) {
      throw new NotFoundException('Question not found');
    }

    Object.assign(existingQuestion, updateQuestionDto);

    return await this.questionRepository.save(existingQuestion);
  }

  async remove(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
