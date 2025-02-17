import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Relation,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, Int } from '@nestjs/graphql';
import { PageInfo, Edge, Connection } from '@kickzone-workspace/utils';
import { SellerInfo } from './seller-info.entity';

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
  name: string;

  @Field()
  @Column({ unique: true })
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

  @OneToOne(() => SellerInfo, (sellerInfo) => sellerInfo.user, {
    nullable: true,
  })
  sellerInfo?: Relation<SellerInfo>;
}

@ObjectType()
export class UserEdge implements Edge<User> {
  @Field(() => String)
  cursor: string | number;

  @Field(() => User)
  node: User;
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
