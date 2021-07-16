import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FitnessClass from 'App/Models/FitnessClass'

// here is where instructor capabilities will go. 
// CRUD for instructors booking a class, canceling a class
// Auth
// TODO: Make sure not to repeat Admin Functionality with other Users. 

export default class FitnessClassesController {

  // Get all Fitness Classes. 
  public async index(ctx: HttpContextContract) {
    const fitnessClasses = await FitnessClass.all()
    return fitnessClasses
  }

  // Get Fitness Class by ID
  public async show({ params }) {
    const fitnessClass = await FitnessClass.find(params.id)
    return fitnessClass
  }

  // Book a box for a class
  public async instructorBookBox(ctx: HttpContextContract){
    // Choose a location
    // Choose a box
    // Choose an available time slot
    // class time/location/box time for hold - Admin to approve
    // Instructor pays for the box registration to book the time
    // Admin aproves, class status will be moved from 'Pending' to 'Booked'
    // Adds to calendar, shows capacity
  }

  // Cancel a class - 
  public async instructorCancelClass(ctx: HttpContextContract) {
    // Instructor fills out form to cancel
    // Need a timeline to cancel/hand off class to another instructor.
    // Hand off to another instructor
    // Cancel if not enough people are confirmed for a class?
    // Notify students of class cancellation/Instructor change
      // If canceled, students need to be given a credit
      // If instructor changes, change the instructor name in the FitnessClass 
      // give students an option to cancel.
  }
}
