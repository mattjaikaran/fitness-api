import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository, ILike } from 'typeorm';
import { PaginationDto } from '../../shared/pagination.dto';
import { FeaturesEntity } from '../settings/entities/features.entity';
import { BoxRatesDto } from './dtos/box-rate.entity';
import { BoxesDto } from './dtos/box.dto';
import { BoxRatesEntity } from './entities/box-rate.entity';
import { BoxesEntity } from './entities/box.entity';
import { BoxRatesRepository } from './repositories/box-rates.repository';
import { BoxesRepository } from './repositories/box.repository';

@Injectable()
export class BoxService {
  constructor(
    private readonly repository: BoxesRepository,
    private readonly boxRatesRepo: BoxRatesRepository,
  ) {}
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
        const features = await getRepository(FeaturesEntity).findByIds(
          data.features,
        );
        box.features = features;
      }
      box = await this.repository.save(box);

      return { box, message: 'Box saved successfully!' };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateBox(id: number, data: BoxesDto) {
    try {
      let box = await this.repository.findOne(id);
      if (!box) {
        throw new HttpException('Box not found', HttpStatus.BAD_REQUEST);
      }
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
        const features = await getRepository(FeaturesEntity).findByIds(
          data.features,
        );
        box.features = features;
      }
      box = await this.repository.save(box);

      return { box, message: 'Box saved successfully!' };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getAllBoxes(data: PaginationDto) {
    try {
      const { page, limit } = data;
      const [boxes, count] = await this.repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC', name: 'ASC', heated: 'DESC' },
      });
      return { boxes, count };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getBoxesById(id: number) {
    try {
      return this.repository.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findBoxesByName(name: string, data: PaginationDto) {
    try {
      const { page, limit } = data;
      const [boxes, count] = await this.repository.findAndCount({
        where: { name: ILike(`%${name}%`) },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC', name: 'ASC', heated: 'DESC' },
      });
      return { boxes, count };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getBoxesHeated(data: PaginationDto) {
    try {
      const { page, limit } = data;
      const [boxes, count] = await this.repository.findAndCount({
        where: { heated: true },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC', name: 'ASC', heated: 'DESC' },
      });
      return { boxes, count };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getBoxesNonHeated(data: PaginationDto) {
    try {
      const { page, limit } = data;
      const [boxes, count] = await this.repository.findAndCount({
        where: { heated: true },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC', name: 'ASC', heated: 'DESC' },
      });
      return { boxes, count };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteBox(id: number) {
    try {
      const box = await this.repository.delete(id);
      return { box, message: 'Deleted successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async setBoxRate(data: BoxRatesDto) {
    try {
      let rate = new BoxRatesEntity();
      rate.box = data.boxId as any;
      rate.timing = data.timingId as any;
      rate.rate = data.rate;
      rate = await this.boxRatesRepo.save(rate);
      return { rate, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateBoxRate(id: number, _rate: number) {
    try {
      let rate = await this.boxRatesRepo.findOne(id);
      rate.rate = _rate;
      rate = await this.boxRatesRepo.save(rate);
      return { rate, message: 'Saved successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteBoxRate(id: number) {
    try {
      const rate = await this.boxRatesRepo.delete(id);
      return { rate, message: 'Deleted successfully.' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getBoxRates(boxId: number) {
    try {
      const rates = await this.repository.findOne({
        where: { id: boxId },
        relations: ['rates'],
      });
      return rates.rates;
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
