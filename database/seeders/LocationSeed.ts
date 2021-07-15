import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Location from 'App/Models/Location'

export default class LocationSeedSeeder extends BaseSeeder {
  public async run () {
    await Location.createMany(seedLocations)
  }
}


const seedLocations = [
  {
    id: 1,
    name: 'Tribeca',
    boxes: [
      'Natural Box',
      'Ethereal Box',
      'Divine Box',
    ],
  },
  {
    id: 2,
    name: 'Flatiron',
    boxes: [
      'Nuclear Box',
    ],
  },
  {
    id: 3,
    name: 'Manhattan',
    boxes: [
      'TBD Box',
    ],
  },
]