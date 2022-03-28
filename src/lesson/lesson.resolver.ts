import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Lesson } from '../common/models/lesson.model';
import { Student } from '../common/models/student.model';
import { StudentService } from '../student/student.service';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => Lesson)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [Lesson])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(() => Lesson)
  createLesson(@Args('data') data: CreateLessonInput) {
    return this.lessonService.createLesson(data);
  }

  @Mutation(() => Lesson)
  assignStudentsToLesson(@Args('data') data: AssignStudentsToLessonInput) {
    return this.lessonService.assignStudentsToLesson(data);
  }
  @ResolveField(() => [Student])
  students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
