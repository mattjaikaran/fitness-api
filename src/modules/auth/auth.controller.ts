import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { error } from 'src/shared/error.dto';
import { AuthMailer } from '../../mails/users/auth.mailer';
import { AppLogger } from '../../services/logs/log.service';
import { UsersService } from '../users/services/users.service';
import { CreateUserDto } from '../users/users.dto';
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
}
