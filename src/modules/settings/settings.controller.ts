import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../decorators/auth.decorator';
import { ROLES } from '../../services/access-control/consts/roles.const';
import { DaysDto } from './dtos/days.dto';
import { ExpertiseDto } from './dtos/expertise.dto';
import { FeaturesDto } from './dtos/features.dto';
import { FloorPlansDto } from './dtos/floor-plans.dto';
import { StylesDto } from './dtos/styles.dto';
import { TimingsDto } from './dtos/timings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
@ApiTags('Settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  //#region Days
  @Auth({ roles: [ROLES.ADMIN] })
  @Get('days')
  async getAllDays() {
    return this.service.getAllDays();
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Post('days')
  async addDay(@Body() data: DaysDto) {
    return this.service.addDay(data);
  }

  //#endregion

  //#region Expertise
  @Auth({ roles: [ROLES.ADMIN] })
  @Get('expertise')
  async getExpertise() {
    return this.service.getAllExpertise();
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Post('expertise')
  async addExpertise(@Body() data: ExpertiseDto) {
    return this.service.addExpertise(data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Put('expertise/:id')
  async updateExpertise(@Param('id') id: number, @Body() data: ExpertiseDto) {
    return this.service.updateExpertise(id, data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Delete('expertise/:id')
  async expertiseFeature(@Param('id') id: number) {
    return this.service.deleteExpertise(id);
  }

  //#endregion

  //#region Features
  @Auth({ roles: [ROLES.ADMIN] })
  @Get('features')
  async getFeatures() {
    return this.service.getAllFeatures();
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Post('features')
  async addFeature(@Body() data: FeaturesDto) {
    return this.service.addFeature(data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Put('features/:id')
  async updateFeature(@Param('id') id: number, @Body() data: FeaturesDto) {
    return this.service.updateFeature(id, data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Delete('features/:id')
  async deleteFeature(@Param('id') id: number) {
    return this.service.deleteFeature(id);
  }

  //#endregion

  //#region Floor Plans

  @Auth({ roles: [ROLES.ADMIN] })
  @Get('floor-plans')
  async getFloorPlans() {
    return this.service.getAllFloorPlans();
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Post('floor-plans')
  async addFloorPlan(@Body() data: FloorPlansDto) {
    return this.service.addFloorPlan(data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Put('floor-plans/:id')
  async updateFloorPlan(@Param('id') id: number, @Body() data: FloorPlansDto) {
    return this.service.updateFloorPlan(id, data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Delete('floor-plans/:id')
  async deleteFloorPlan(@Param('id') id: number) {
    return this.service.deleteFloorPlan(id);
  }

  //#endregion

  //#region Styles
  @Auth({ roles: [ROLES.ADMIN] })
  @Get('styles')
  async getStyles() {
    return this.service.getAllStyles();
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Post('styles')
  async addStyle(@Body() data: StylesDto) {
    return this.service.addStyle(data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Put('styles/:id')
  async updateStyle(@Param('id') id: number, @Body() data: StylesDto) {
    return this.service.updateStyle(id, data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Delete('styles/:id')
  async deleteStyle(@Param('id') id: number) {
    return this.service.deleteStyle(id);
  }

  //#endregion

  //#region Timings

  @Auth({ roles: [ROLES.ADMIN] })
  @Get('timings')
  async getTimings() {
    return this.service.getAllTimings();
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Post('Timings')
  async addTiming(@Body() data: TimingsDto) {
    return this.service.addTiming(data);
  }

  @Auth({ roles: [ROLES.ADMIN] })
  @Put('Timings/:id')
  async updateTiming(@Param('id') id: number, @Body() data: TimingsDto) {
    return this.service.updateTiming(id, data);
  }
  @Auth({ roles: [ROLES.ADMIN] })
  @Delete('Timings/:id')
  async deleteTiming(@Param('id') id: number) {
    return this.service.deleteTiming(id);
  }

  //#endregion
}
