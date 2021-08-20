import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { ROLES } from 'src/services/access-control/consts/roles.const';
import { BoxService } from './box.service';
import { BoxesDto } from './dtos/box.dto';

@Controller('box')
@ApiTags("Box")
export class BoxController {
  constructor(private readonly service: BoxService) {}

  //@Auth({ roles: [ROLES.ADMIN] })
  @Post()
  async createBox(@Body() data: BoxesDto) {
    return this.service.createBox(data);
  }
}
