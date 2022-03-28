import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../common/entities/student.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
  async getStudent(id: string): Promise<Student> {
    return await this.studentRepository.findOneOrFail({ where: { id: id } });
  }

  async createStudent(data: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = data;
    const student = this.studentRepository.create({
      id: randomUUID(),
      firstName,
      lastName,
    });

    return await this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: { id: { $in: studentIds } as any },
    });
  }
}
