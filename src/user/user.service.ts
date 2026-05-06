import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async myProfile(id: string) {
    const userProfile = await this.userRepository.findById(id);
    if (!userProfile) {
      throw new NotFoundException('profile not found');
    }
    return userProfile;
  }
}
