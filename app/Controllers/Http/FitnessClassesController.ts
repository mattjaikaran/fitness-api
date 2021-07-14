import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FitnessClass from 'App/Models/FitnessClass'

// here is where instructor capabilities will go. 
// CRUD for instructors booking a class, canceling a class
// Auth

// Book a class - 
// Choose a location
// Choose a box
// Choose an available time slot
// class time/location/box time for hold - Admin to approve
// Instructor pays for the box registration to book the time
// Admin aproves, class status will be moved from 'Pending' to 'Booked'
// Adds to calendar, shows capacity

// Cancel a class - 
// Instructor fills out form to cancel
  // Need a timeline to cancel/hand off class to another instructor.
  // Hand off to another instructor
  // Cancel if not enough people are confirmed for a class?
// Notify students of class cancellation/Instructor change
    // If canceled, students need to be given a credit
    // If instructor changes, change the instructor name in the FitnessClass 
      // give students an option to cancel.

export default class FitnessClassesController {

  public async index(ctx: HttpContextContract) {
    // once models and seeds are figured out -
    // const fitnessClasses = await FitnessClass.all()
    // return fitnessClasses
    return [
      {
        id: 1,
        title: 'Yoga1',
      },
      {
        id: 2,
        title: 'Pilates1',
      },
    ]
  }

  public async show({ params }) {
    const fitnessClass = await FitnessClass.find(params.id)
    return fitnessClass
  }
}
