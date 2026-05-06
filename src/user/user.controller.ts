import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async profile(id: string) {
    const userProfile = await this.userService.myProfile(id);
    return {
      success: true,
      message: 'profile loaded successfully',
      data: userProfile,
    };
  }
}
