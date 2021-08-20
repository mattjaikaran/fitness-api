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
import { DaysDto } from './dtos/days.dto';
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

  @Get('days')
  async getAllDays() {
    return this.service.getAllDays();
  }

  @Post('days')
  async addDay(@Body() data: DaysDto) {
    return this.service.addDay(data);
  }

  //#endregion

  //#region Features

  @Get('features')
  async getFeatures() {
    return this.service.getAllFeatures();
  }

  @Post('features')
  async addFeature(@Body() data: FeaturesDto) {
    return this.service.addFeature(data);
  }

  @Put('features/:id')
  async updateFeature(@Param('id') id: number, @Body() data: FeaturesDto) {
    return this.service.updateFeature(id, data);
  }
  @Delete('features/:id')
  async deleteFeature(@Param('id') id: number) {
    return this.service.deleteFeature(id);
  }

  //#endregion

  //#region Floor Plans

  @Get('floor-plans')
  async getFloorPlans() {
    return this.service.getAllFloorPlans();
  }

  @Post('floor-plans')
  async addFloorPlan(@Body() data: FloorPlansDto) {
    return this.service.addFloorPlan(data);
  }

  @Put('floor-plans/:id')
  async updateFloorPlan(@Param('id') id: number, @Body() data: FloorPlansDto) {
    return this.service.updateFloorPlan(id, data);
  }
  @Delete('floor-plans/:id')
  async deleteFloorPlan(@Param('id') id: number) {
    return this.service.deleteFloorPlan(id);
  }

  //#endregion

  //#region Styles

  @Get('styles')
  async getStyles() {
    return this.service.getAllStyles();
  }

  @Post('styles')
  async addStyle(@Body() data: StylesDto) {
    return this.service.addStyle(data);
  }

  @Put('styles/:id')
  async updateStyle(@Param('id') id: number, @Body() data: StylesDto) {
    return this.service.updateStyle(id, data);
  }
  @Delete('styles/:id')
  async deleteStyle(@Param('id') id: number) {
    return this.service.deleteStyle(id);
  }

  //#endregion

  //#region Timings

  @Get('timings')
  async getTimings() {
    return this.service.getAllTimings();
  }

  @Post('Timings')
  async addTiming(@Body() data: TimingsDto) {
    return this.service.addTiming(data);
  }

  @Put('Timings/:id')
  async updateTiming(@Param('id') id: number, @Body() data: TimingsDto) {
    return this.service.updateTiming(id, data);
  }
  @Delete('Timings/:id')
  async deleteTiming(@Param('id') id: number) {
    return this.service.deleteTiming(id);
  }

  //#endregion
}
