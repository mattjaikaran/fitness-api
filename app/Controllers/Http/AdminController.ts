// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// here is where admin capabilities will go. 
// CRUD users, etc
export default class AdminController {
  public async index() {
    return { message: 'Admin Controller Index' }
  }

  // Get All Fitness Classes
  // Get All Boxes
  // Get Fitness Class by ID/Type/Instructor
  // Get an Instructor/Student/Admin User by ID
  // Get a Box by ID
  // Create new Instructor/Student/Admin User
  // Create new Location
  // Create new Box
  // Create new Fitness Class
  // Update Fitness Class
  // Update Box 
  // Update Student/Instructor/Admin User 
  // Delete a Fitness Class/Box reservation
  // Delete a Student/Instructor/Admin User
  // Delete a Box

  // Admin User approves a Box. PUT/PATCH Request
  public async approveBox() {
    // Get a Fitness class by Box approval 'Pending' 
    // Update from Pending to Confirmed/Cancelled. 
    // Return updated Fitness Class. 
    // Message: `Class is ${boxStatus}. ${fitnessClass} is at ${DateTime}`
  }
}
