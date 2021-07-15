import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FitnessClass from 'App/Models/FitnessClass'

export default class FitnessClassSeeder extends BaseSeeder {
  public async run () {
    await FitnessClass.createMany(seedClasses)
  }
}

const seedClasses = [
  {
    id: 1,
    type: 'Yoga',
    name: 'Yoga1',
    classTime: 'August 13, 2021, 1:30 PM EDT',
    instructor: 'Matias Jose',
    location: 'Noho',
    box: 'Box 2',
    length: 30,
    capacity: 12,
    price: 40,
  },
  {
    id: 2,
    type: 'Spin',
    name: 'Spin2',
    classTime: 'August 13, 2021, 11:30 AM EDT',
    instructor: 'Jim Bob',
    location: 'Bryant Park',
    box: 'Box 1',
    length: 60,
    capacity: 10,
    price: 30,
  },
  {
    id: 3,
    type: 'Yoga',
    name: 'Yoga2',
    classTime: 'August 13, 2021, 12:30 PM EDT',
    instructor: 'Matias Jose',
    location: 'Noho',
    box: 'Box 1',
    length: 60,
    capacity: 12,
    price: 40,
  },
  {
    id: 4,
    type: 'Spin',
    name: 'Spin2',
    classTime: 'August 14, 2021, 08:30 AM EDT',
    instructor: 'Josh Bryant',
    location: 'Bryant Park',
    box: 'Box 1',
    length: 30,
    capacity: 8,
    price: 50,
  },
]