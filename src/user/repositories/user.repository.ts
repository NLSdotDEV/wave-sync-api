import { BaseRepository } from 'src/common/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async loadUserWithPassword(options: FindOneOptions<User>) {
    const user = await this.userRepository.findOne({
      ...options,
      select: ['password', 'firstName', 'lastLoggedInAt', 'lastName'],
    });

    return user;
  }
}
