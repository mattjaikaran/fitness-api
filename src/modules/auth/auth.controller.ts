import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/services/access-control/consts/roles.const';
import { logger } from 'src/services/logs/log.storage';
import { error } from 'src/shared/error.dto';
import { Auth } from '../../decorators/auth.decorator';
import { LoginUser } from '../../decorators/user.decorator';
import { AuthMailer } from '../../mails/users/auth.mailer';
import { AppLogger } from '../../services/logs/log.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';
import {
  CreateUserDto,
  UpdateProfileDto,
  UpdateProfilePasswordDto
} from '../users/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authMailer: AuthMailer,
    private readonly authService: AuthService,
    private readonly logger: AppLogger,
    private readonly userService: UsersService,
  ) {
    this.logger.setContext('AuthController');
  }


  @ApiBody({ required: true })
  @Post('login')
  async login(@Request() req: any) {
    try {
      return this.authService.login(
        await this.authService.validateUser(req.body),
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
  
  // @Auth({})
  @Post('register')
  @UsePipes(ValidationPipe)
  async createUser(@Body() user: CreateUserDto) {
    try {
      if (user.username == 'admin') {
        throw new BadRequestException(
          'You cannot create user with username admin',
        );
      }
      if (
        !user.mobile ||
        !user.email ||
        !user.firstName ||
        !user.lastName ||
        !user.password ||
        !user.username
      ) {
        throw new BadRequestException(
          'One of mandatory fields(firstName,lastName,username,email,password,mobile) missing.',
        );
      }
      if (user.username.includes(' ')) {
        throw new UnprocessableEntityException(
          error(
            [
              {
                key: 'username',
                reason: 'invalidData',
                description: 'Username contains space character',
              },
            ],
            HttpStatus.UNPROCESSABLE_ENTITY,
            'Unprocessable entity',
          ),
        );
      }
      user.mobile = user.mobile
        .replace(' ', '')
        .replace('(', '')
        .replace(')', '')
        .replace('-', '');
      const newUser = await this.userService.createUser(user);
      return {
        data: newUser,
        accessToken: (await this.authService.login(newUser.user)).accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  @Auth({ })
  @Post('updateProfile')
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Body() user: UpdateProfileDto,
    @LoginUser() _user: UserEntity,
  ) {
    try {
      const updateUser = await this.userService.updateUser(_user.id, user);
      return { data: updateUser };
    } catch (error) {
      throw error;
    }
  }

  @Auth({ })
  @Post('updatePassword')
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Body() data: UpdateProfilePasswordDto,
    @LoginUser() _user: UserEntity,
  ) {
    try {
      const updateUser = await this.userService.updatePassword(_user.id, data);
      return { data: updateUser.message };
    } catch (error) {
      throw error;
    }
  }
}
