import { User } from '@kickzone-workspace/entities';
import {
  Connection,
  ConnectionArgs,
  createConnection,
} from '@kickzone-workspace/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  }: ConnectionArgs): Promise<Connection<User>> {
    const query = this.userRepository.createQueryBuilder('user');

    if (searchTerm) {
      query.where('user.name LIKE :searchTerm OR user.email LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
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
}
