import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Box from 'App/Models/Box'

export default class BoxSeedSeeder extends BaseSeeder {
  public async run () {
    await Box.createMany(seedBoxes)
  }
}

const seedBoxes = [
  {
    id: 1,
    name: 'Natural Box',
    location: 'Tribeca',
    available: true,
    capacity: 20,
  },
  {
    id: 2,
    name: 'Ethereal Box',
    location: 'Tribeca',
    available: true,
    capacity: 15,
  },
  {
    id: 3,
    name: 'Divine Box',
    location: 'Tribeca',
    available: true,
    capacity: 10,
  },
]