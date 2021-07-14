import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class FitnessClassSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
  }
}


const seedClasses = [
  {
    id: 1,
    type: 'Yoga',
    name: 'Yoga1',
    date: 'asdf',
    instructor: 'Matias Jose',
    length: 30,
    capacity: 12,
    price: 40,
  },
]