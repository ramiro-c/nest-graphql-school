import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Student } from './student.model';

@ObjectType()
export class Lesson {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [Student])
  students: string[];
}
