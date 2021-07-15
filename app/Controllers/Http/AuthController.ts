// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Instructor from "App/Models/Instructor"
import Student from "App/Models/Student"
import User from "App/Models/User"

export default class AuthController {

  // Login User (Student, Instructor, Admin)
  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  // Logout User (Student, Instructor, Admin)
  public async logout({ auth, response }) {
    await auth.use('web').logout()
    response.redirect('/login')
  }

  // Register User (Student, Instructor, Admin)
  public async register({ auth, request, response }) {
    // const student = new Student()
    // const instructor = new Instructor()
    // const user = new User()

    // const email = request.input('email')
    // const password = request.input('password')

    try {
      // pseudo code -> 
      // await student.save() || instructor.save() || user.save()
      // response.redirect('/dashboard')
    } catch (err) {
      return response.badRequest(err)
    }
  }
}
