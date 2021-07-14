import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany(seedUsers)
  }
}

const seedUsers = [
  {
    id: 1,
    firstName: 'Super Admin',
    lastName: 'User',
    role: 'superadmin',
    email: 'mattjaikaran@gmail.com',
    password: 'asdf1234!',
    phone: '9175550198',
  },
  {
    id: 2,
    firstName: 'Test Admin',
    lastName: 'User',
    role: 'admin',
    email: 'testadmin@gmail.com',
    password: 'fdsa4321!',
    phone: '5085551111',
  },
  {
    id: 3,
    firstName: 'Test Regular',
    lastName: 'User',
    role: 'admin',
    email: 'testregular@gmail.com',
    password: 'fdsa4321!',
    phone: '9545551111',
  },
]