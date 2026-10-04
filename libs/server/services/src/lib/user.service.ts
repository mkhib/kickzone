import { User, UserRole } from '@kickzone-workspace/entities';
import { CreateUserInput } from '@kickzone-workspace/inputs';
import {
  Connection,
  ConnectionArgs,
  createConnection,
} from '@kickzone-workspace/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAllPaginated({
    first = 10,
    after,
    searchTerm,
    role,
  }: ConnectionArgs & { role?: UserRole }): Promise<Connection<User>> {
    const query = this.userRepository.createQueryBuilder('user');

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    if (searchTerm) {
      query.andWhere(
        '(LOWER(user.name) LIKE LOWER(:searchTerm) OR LOWER(user.lastName) LIKE LOWER(:searchTerm) OR LOWER(user.email) LIKE LOWER(:searchTerm) OR LOWER(user.username) LIKE LOWER(:searchTerm))',
        { searchTerm: `%${searchTerm}%` }
      );
    }

    if (after) {
      query.andWhere('user.id > :after', { after });
    }

    const [users, totalCount] = await query
      .orderBy('user.id', 'ASC')
      .take(first)
      .getManyAndCount();

    return createConnection(users, totalCount, first, after);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    // Note: Password should already be hashed by the caller (auth.service)
    // This service is just for CRUD operations
    const user = this.userRepository.create({
      ...createUserInput,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }
}
