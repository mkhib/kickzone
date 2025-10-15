import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, Int } from '@nestjs/graphql';
import { Connection, Edge, PageInfo } from '@kickzone-workspace/utils';

export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  @Index()
  name: string;

  @Field()
  @Column()
  @Index()
  lastName: string;

  @Field()
  @Column({ unique: true })
  @Index()
  username: string;

  @Field()
  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 'en' })
  locale?: string;
}

@ObjectType()
export class UserEdge implements Edge<User> {
  @Field(() => User)
  node: User;

  @Field()
  cursor: string;
}

@ObjectType()
export class UserConnection implements Connection<User> {
  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}

export type UserWithoutPassword = Omit<User, 'password'>;
