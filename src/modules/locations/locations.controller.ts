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
import { Auth } from '../../decorators/auth.decorator';
import { ROLES } from '../../services/access-control/consts/roles.const';
import { PaginationDto } from '../../shared/pagination.dto';
import { CreateLocationDto, UpdateLocationDto } from './dto/locations.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
@ApiTags('Locations')
export class LocationsController {
  constructor(private readonly service: LocationsService) {}

  @Auth({ roles: [ROLES.ADMIN] })
  @Get()
  async getAllLocations(@Query() data: PaginationDto) {
    return this.service.getAllLocations(data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Get('find/:name')
  async findLocationByName(
    @Query() data: PaginationDto,
    @Param('name') name: string,
  ) {
    return this.service.findLocationByName(name, data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Get(':id')
  async getLocationById(@Param('id') id: number) {
    return this.service.getLocationById(id);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Post()
  async createLocation(@Body() data: CreateLocationDto) {
    return this.service.createLocation(data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Put(':id')
  async updateLocation(
    @Param('id') id: number,
    @Body() data: UpdateLocationDto,
  ) {
    return this.service.updateLocation(id, data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Delete(':id')
  async deleteLocation(@Param('id') id: number) {
    return this.service.deleteLocation(id);
  }
}
