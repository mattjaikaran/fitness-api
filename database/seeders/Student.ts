import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'

export default class StudentSeeder extends BaseSeeder {
  public async run () {
    await Student.createMany([
      {
        id: 1,
        firstName: 'Test',
        lastName: 'Student',
        email: 'mattjaikaranweb@gmail.com',
        password: 'asdf1234',
        phone: '2125550198',
        pastClasses: [
          // { add past class data },
        ]
      },
    ])
  }
}


const seedStudents = [
  {
    id: 1,
    firstName: 'Test',
    lastName: 'Student',
    email: 'mattjaikaranweb@gmail.com',
    password: 'asdf1234',
    phone: '2125550198',
    pastClasses: [
      // { add past class data },
    ]
  },
]