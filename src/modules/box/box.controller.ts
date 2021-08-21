import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { PaginationDto } from 'src/shared/pagination.dto';
import { ROLES } from '../../services/access-control/consts/roles.const';
import { BoxService } from './box.service';
import { BoxRatesDto } from './dtos/box-rate.entity';
import { BoxesDto, UpdateBoxesDto } from './dtos/box.dto';

@Controller('box')
@ApiTags('Box')
export class BoxController {
  constructor(private readonly service: BoxService) {}

  @Auth({ roles: [ROLES.ADMIN] })
  @Post()
  async createBox(@Body() data: BoxesDto) {
    return this.service.createBox(data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Put(':id')
  async updateBox(@Param('id') id: number, @Body() data: UpdateBoxesDto) {
    return this.service.updateBox(id, data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Delete(':id')
  async deleteBox(@Param('id') id: number, @Body() data: UpdateBoxesDto) {
    return this.service.deleteBox(id);
  }

  @Get()
  async getAllBoxes(@Query() data: PaginationDto) {
    return this.service.getAllBoxes(data);
  }

  @Get('find/:name')
  async findBoxesByName(
    @Query() data: PaginationDto,
    @Param('name') name: string,
  ) {
    return this.service.findBoxesByName(name, data);
  }

  @Get(':id')
  async getBoxesById(@Param('id') id: number) {
    return this.service.getBoxesById(id);
  }

  @Get('/heated')
  async getBoxesHeated(@Query() data: PaginationDto) {
    return this.service.getBoxesHeated(data);
  }

  @Get('/non-heated')
  async getBoxesNonHeated(@Query() data: PaginationDto) {
    return this.service.getBoxesNonHeated(data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Post('rates')
  async setBoxRate(@Body() data: BoxRatesDto) {
    return this.service.setBoxRate(data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Put('rates/:id')
  async updateBoxRate(@Param('id') id: number, @Query('rate') rate: number) {
    return this.service.updateBoxRate(id, rate);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Delete('rates/:id')
  async deleteBoxRate(@Param('id') id: number) {
    return this.service.deleteBoxRate(id);
  }

  @Get('rates/:boxId')
  async getBoxRates(@Param('boxId') boxId: number) {
    return this.service.getBoxRates(boxId);
  }
}
