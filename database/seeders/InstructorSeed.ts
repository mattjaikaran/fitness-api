import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Instructor from 'App/Models/Instructor'

export default class InstructorSeeder extends BaseSeeder {
  public async run () {
    await Instructor.createMany(seedInstructors)
  }
}


const seedInstructors = [
  {
    id: 1,
    firstName: 'Test',
    lastName: 'Instructor',
    email: 'mjaikaran@kettlespace.com',
    password: 'asdf1234!',
    phone: '9175550198',
    pastClasses: [
      // { add past class data },
    ]
  },
]