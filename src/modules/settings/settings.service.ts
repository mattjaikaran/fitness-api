import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DaysDto } from './dtos/days.dto';
import { FeaturesDto } from './dtos/features.dto';
import { FloorPlansDto } from './dtos/floor-plans.dto';
import { StylesDto } from './dtos/styles.dto';
import { TimingsDto } from './dtos/timings.dto';
import { DaysEntity } from './entities/days.entity';
import { FeaturesEntity } from './entities/features.entity';
import { FloorPlansEntity } from './entities/floor-plans.entity';
import { StylesEntity } from './entities/styles.entity';
import { TimingsEntity } from './entities/timings.entity';
import { DaysRepository } from './repositories/days.repository';
import { FeaturesRepository } from './repositories/features.repository';
import { FloorPlansRepository } from './repositories/floor-plans.repository';
import { StylesRepository } from './repositories/styles.repository';
import { TimingsRepository } from './repositories/timings.repository';

@Injectable()
export class SettingsService {
  constructor(
    private readonly days: DaysRepository,
    private readonly features: FeaturesRepository,
    private readonly floorPlans: FloorPlansRepository,
    private readonly styles: StylesRepository,
    private readonly timings: TimingsRepository,
  ) {}

  //#region Days
  async getAllDays() {
    return this.days.find();
  }

  async addDay(data: DaysDto) {
    try {
      let day = new DaysEntity();
      day.name = data.name;
      day = await this.days.save(day);
      return { day, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  //#endregion

  //#region Features
  async getAllFeatures() {
    return this.features.find();
  }

  async addFeature(data: FeaturesDto) {
    try {
      let feature = new FeaturesEntity();
      feature.name = data.name;
      feature.description = data.description;
      feature = await this.features.save(feature);
      return { feature, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateFeature(id: number, data: FeaturesDto) {
    try {
      let feature = new FeaturesEntity();
      feature.id = id;
      if (data.name) feature.name = data.name;
      if (data.description) feature.description = data.description;
      feature = await this.features.save(feature);
      return { feature, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteFeature(id: number) {
    try {
      const feature = await this.features.delete(id);
      return { feature, message: 'Deleted successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  //#endregion

  //#region Floor Plans
  async getAllFloorPlans() {
    return this.floorPlans.find();
  }

  async addFloorPlan(data: FloorPlansDto) {
    try {
      let floorPlan = new FloorPlansEntity();
      floorPlan.name = data.name;
      floorPlan.description = data.description;
      floorPlan = await this.floorPlans.save(floorPlan);
      return { floorPlan, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateFloorPlan(id: number, data: FloorPlansDto) {
    try {
      let floorPlan = new FloorPlansEntity();
      floorPlan.id = id;
      if (data.name) floorPlan.name = data.name;
      if (data.description) floorPlan.description = data.description;
      floorPlan = await this.floorPlans.save(floorPlan);
      return { floorPlan, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteFloorPlan(id: number) {
    try {
      const floorPlan = await this.floorPlans.delete(id);
      return { floorPlan, message: 'Deleted successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  //#endregion

  //#region Styles
  async getAllStyles() {
    return this.styles.find();
  }

  async addStyle(data: StylesDto) {
    try {
      let style = new StylesEntity();
      style.name = data.name;
      style.description = data.description;
      style = await this.styles.save(style);
      return { style, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateStyle(id: number, data: StylesDto) {
    try {
      let style = new StylesEntity();
      style.id = id;
      if (data.name) style.name = data.name;
      if (data.description) style.description = data.description;
      style = await this.styles.save(style);
      return { style, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteStyle(id: number) {
    try {
      const Style = await this.styles.delete(id);
      return { Style, message: 'Deleted successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  //#endregion

  //#region Timings
  async getAllTimings() {
    return this.timings.find();
  }

  async addTiming(data: TimingsDto) {
    try {
      let Timing = new TimingsEntity();
      Timing.day = data.dayId as any;
      Timing.endTime = data.endTime;
      Timing.startTime = data.startTime;
      Timing = await this.timings.save(Timing);
      return { Timing, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateTiming(id: number, data: TimingsDto) {
    try {
      let Timing = new TimingsEntity();
      Timing.id = id;
      if (data.dayId) Timing.day = data.dayId as any;
      if (data.endTime) Timing.endTime = data.endTime;
      if (data.startTime) Timing.startTime = data.startTime;

      Timing = await this.timings.save(Timing);
      return { Timing, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteTiming(id: number) {
    try {
      const Timing = await this.timings.delete(id);
      return { Timing, message: 'Deleted successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  //#endregion
}
