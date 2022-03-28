import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../common/entities/lesson.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }
  async getLesson(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOneOrFail({ where: { id: id } });
  }

  async createLesson(data: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = data;
    const lesson = this.lessonRepository.create({
      id: randomUUID(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    data: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = data;
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    lesson.students = [...lesson.students, ...studentIds];

    return this.lessonRepository.save(lesson);
  }
}
