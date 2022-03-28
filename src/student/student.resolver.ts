import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Student } from '../common/models/student.model';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => Student)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query(() => [Student])
  students() {
    return this.studentService.getStudents();
  }

  @Mutation(() => Student)
  createStudent(@Args('data') data: CreateStudentInput) {
    return this.studentService.createStudent(data);
  }
}
