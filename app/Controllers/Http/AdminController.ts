// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// here is where admin capabilities will go. 
// CRUD users, etc
export default class AdminController {
  public async index() {
    return { message: 'Admin Controller Index' }
  }

  // Get All Locations
  public async getAllLocations() {}
  // Get All Boxes
  public async getAllBoxes() {}
  // Get All Fitness Classes
  public async getAllFitnessClasses() {}
  // Get ALL Users (All Instructors, All Students, All Admin Users)
  public async getAllUsers() {}
  // Get All Instructors
  public async getAllInstructors() {}
  // Get All Students
  public async getAllStudents() {}
  // Get All Admin Users
  public async getAllAdminUsers() {}
  // Get a Location by ID/Name
  public async getLocationById() {}
  // Get a Box by ID/Name
  public async getBoxById() {}
  // Get a Box by Status/Availability
  public async getBoxByStatus() {}
  // Get all Students in Fitness Class
  public async getAllStudentsInClass() {}
  // Get a Fitness Class by ID/Name/Type/Instructor
  public async getFitnessClassById() {}
  public async getFitnessClassByName() {}
  public async getFitnessClassByType() {}
  public async getFitnessClassByInstructor() {}
  // Get a User's Fitness Class History
  public async getUserClassHistory() {}
  // Get an Instructor/Student/Admin User by ID/Name
  public async getUserById() {}
  // Create a new Location
  public async createLocation() {}
  // Create a new Box
  public async createBox() {}
  // Create a new Fitness Class
  public async createFitnessClass() {}
  // Create a new Instructor/Student/Admin User
  public async createUser() {}
  // Update a Location
  public async updateLocation() {}
  // Update a Box 
  public async updateBox() {}
  // Update a Fitness Class
  public async updateFitnessClass() {}
  // Update a Student/Instructor/Admin User 
  public async updateUser() {}
  // Delete a Location
  public async deleteLocation() {}
  // Delete a Box
  public async deleteBox() {}
  // Delete a Fitness Class/Box reservation
  public async deleteBoxReservation() {}
  // Delete a Student/Instructor/Admin User
  public async deleteUser() {}

  // Admin User approves a Box. PUT/PATCH Request
  public async approveBox() {
    // Get a Fitness class by Box Reservation Status = 'Pending' 
    // Update from Pending to Confirmed/Cancelled. 
    // Change available to false.
    // Return updated Fitness Class. 
    // Message: `Class is ${boxStatus}. ${fitnessClass} is at ${DateTime}`
  }
}
