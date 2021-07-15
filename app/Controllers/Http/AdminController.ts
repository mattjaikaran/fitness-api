// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// here is where admin capabilities will go. 
// CRUD users, etc
export default class AdminController {
  public async index() {
    return { message: 'Admin Controller Index' }
  }
}
