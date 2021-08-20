import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/shared/pagination.dto';
import { ILike } from 'typeorm';
import { CreateLocationDto, UpdateLocationDto } from './dto/locations.dto';
import { LocationsRepository } from './repositories/location.repository';

@Injectable()
export class LocationsService {
  constructor(private readonly repository: LocationsRepository) {}

  async getAllLocations(data: PaginationDto) {
    try {
      const { page, limit } = data;
      const [locations, count] = await this.repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return { locations, count };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getLocationById(id: number) {
    try {
      return this.repository.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findLocationByName(name: string, data: PaginationDto) {
    try {
      const { page, limit } = data;
      const [locations, count] = await this.repository.findAndCount({
        where: { name: ILike(`%${name}%`) },
        skip: (page - 1) * limit,
        take: limit,
      });
      return { locations, count };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async createLocation(data: CreateLocationDto) {
    try {
      const location = await this.repository.save(data);
      return {
        location,
        message: 'Location added successfully!',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateLocation(id: number, data: UpdateLocationDto) {
    try {
      const location = await this.repository.findOne(id);
      if (!location) {
        throw new HttpException(
          'Location does not exist',
          HttpStatus.NO_CONTENT,
        );
      }
      if (data.address) {
        location.address = data.address;
      }

      if (data.contactNumber) {
        //2fa if required
        location.contactNumber = data.contactNumber;
      }
      if (data.description) {
        location.description = data.description;
      }

      if (data.email) {
        //verify if required
        location.email = data.email;
      }
      if (data.name) {
        location.name = data.name;
      }

      const updatedLocation = await this.repository.save(location);
      return {
        location: updatedLocation,
        message: 'Location updated successfully!',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteLocation(id: number) {
    try {
      const deletedLocation = await this.repository.delete(id);
      return {
        location: deletedLocation,
        message: 'Location deleted successfully!',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
