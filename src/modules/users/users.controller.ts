import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Auth } from '../../decorators/auth.decorator';
import { LoginUser } from '../../decorators/user.decorator';
import { ROLES } from '../../services/access-control/consts/roles.const';
import { CompressJSON } from '../../services/common/compression/compression.interceptor';
import { PaginatorError, PaginatorErrorHandler } from '../../shared/paginator';
import { inValidDataRes } from '../../shared/res.fun';
import { UserEntity } from './entities/user.entity';
import { InValidDataError } from './errors/users.error';
import { editFileName, imageFileFilter } from './imageupload.service';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';
import { UpdateProfileDto, UpdateRole } from './users.dto';

// const idToPath = (x, data) => {
//   return `APP/${data.orgId}/${TABLES.USERS.id}/${data.id}/${path}`;
// };
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @Auth({ roles: [ROLES.ADMIN] })
  @Get('')
  @CompressJSON()
  async getAllUsers(@Body('jData') data: any) {
    return this.userService.getAllUsers(data);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@LoginUser() user: UserEntity): Promise<UserEntity> {
    return this.userService.findOne({
      where: { id: user.id },
    });
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Get('/roles')
  async getRoles(@LoginUser() user: any) {
    console.log(user);
    const res = this.rolesService.findAll();
    return res;
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Get('/:id')
  async getUser(@Param('id') id: number) {
    try {
      const user = await this.userService.findOne({ where: { id: id } });
      return { data: user };
    } catch (error) {
      if (error instanceof PaginatorError) {
        throw PaginatorErrorHandler(error);
      }
      throw error;
    }
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Post(':id/update')
  @UsePipes(ValidationPipe)
  async updateUser(@Body() user: UpdateProfileDto, @Param('id') id: string) {
    try {
      if (user.username == 'admin') {
        throw new BadRequestException('You cannot change username to admin');
      }
      const updateUser = await this.userService.updateUser(id, user);

      return { updateUser };
    } catch (error) {
      if (error instanceof InValidDataError) {
        throw new BadRequestException(inValidDataRes([error.message]));
      }
      throw error;
    }
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Put(':id/update-role')
  @UsePipes(ValidationPipe)
  async updateRole(@Body() user: UpdateRole, @Param('id') id: string) {
    try {
      const updateUser = await this.userService.updateRoles(id, user);
      return { data: updateUser };
    } catch (error) {
      if (error instanceof InValidDataError) {
        throw new BadRequestException(inValidDataRes([error.message]));
      }
      throw error;
    }
  }

  @Auth({})
  @Post('profile-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() image: any, @LoginUser() _user: UserEntity) {
    // //console.log(pic);
    const user = await this.userService.findOne(_user.id);

    //upload pic
    return this.userService.setProfileImage(user, image);
  }

  @Get('/un/:username')
  async getUserByUsername(@Param('username') username: string) {
    try {
      const _u = await this.userService.findOne({
        where: { username: username },
      });
      if (_u) {
        return { user: _u };
      }
      throw new BadRequestException('User not found in our system');
    } catch (e) {
      throw e;
    }
  }
}
