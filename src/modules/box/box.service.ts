import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { FeaturesEntity } from '../settings/entities/features.entity';
import { BoxesDto } from './dtos/box.dto';
import { BoxesEntity } from './entities/box.entity';
import { BoxesRepository } from './repositories/box.repository';

@Injectable()
export class BoxService {
  constructor(private readonly repository: BoxesRepository) {}
  async createBox(data: BoxesDto) {
    try {
      let box = new BoxesEntity();
      if (data.name) box.name = data.name;
      if (data.shortDescription) box.shortDescription = data.shortDescription;
      if (data.longDescription) box.longDescription = data.longDescription;
      if (data.locationId) box.location = data.locationId as any;
      if (data.size) box.size = data.size;
      if (data.styleId) box.style = data.styleId as any;
      if (data.floorPlanId) box.floorPlan = data.floorPlanId as any;
      if (data.maxCapacity) box.maxCapacity = data.maxCapacity;
      if (data.heated) box.heated = data.heated;

      if (data.features) {
        const features = await getRepository(FeaturesEntity).findByIds(data.features);
        box.features = features;
      }
      box = await this.repository.save(box);

      return { box, message: 'Box saved successfully!' };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
