import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// here is where student capabilities will go. 
// CRUD for students booking a class, canceling a class
// Auth

export default class StudentBookingController {
  // Get all Fitness Classes
  public async index(ctx: HttpContextContract) {
    return { message: 'Student Booking Controller Index' }
  }

  // Get Fitness class by ID
  public async getFitnessClassByID({ params }) {}

  // Get Fitness Class by Availaibity/Status
  public async getFitnessClassByStatus() {}

  // Get Fitness Class by Instructor
  public async getFitnessClassByInstructor() {}

  // Get Fitness Class by Day
  public async getFitnessClassByDay() {}

  // Get Fitness Class by Type
  public async getFitnessClassByType() {}


  // Student books their spot in a Fitness Class
  public async studentBookFitnessClass(ctx: HttpContextContract) {
    // Needs to have search by location, box, exercise, and instructor
    // Choose a Location
    // Choose a Box
    // Choose an available time slot if has less than the capacity.
      // Show an option for if less than N students, notify or something?
      // If class is at capacity, have an option to waitlist 
      // And get notified of how many others were notified from the waitlist
    // Student pays for the class to book the time
    // Adds to calendar, shows capacity, +1 to capacity 
    // Email notification of confirmation with calendar event with all the data needed.
      // If class data updates, can send an email notification with updated event details. 
  }

  // Student cancels their spot in a Fitness Class
  public async studentCancel(ctx: HttpContextContract) {
    // Student fills out form to cancel
    // Need a timeline to cancel class?
    // -1 to Fitness Class capacity 
    // Removed cancelled class from the Student’s Fitness Class History array.
    // Notify instructor of student cancellation
      // If canceled, students need to be given a credit. No refund.
      // Notify Waitlisted students of available spot in the class. 
  }

  // Put a student on a waitlist for a Fitness Class
  public async studentAddToWaitlist(ctx: HttpContextContract) {
    // Sign up for waitlist. Fill a form.
    // Get an email notification that theyre added to the waitlist
    // Have the ability to cancel a waitlist. 
    // Notify instructors of how many waitlisted.
  }
}
