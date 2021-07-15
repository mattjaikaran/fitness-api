// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// here is where student capabilities will go. 
// CRUD for students booking a class, canceling a class
// Auth

// Book a class - 
// Needs to have search by location, box, exercise, and instructor
// Choose a location
// Choose a box
// Choose an available time slot if has less than the capacity.
  // Show an option for if less than N students, notify or something?
  // If class is at capacity, have an option to waitlist 
  // And get notified of how many others were notified from the waitlist
// class time/location/box time for hold - Admin to approve
// Student pays for the class to book the time
// Admin aproves, class status will be moved from 'Pending' to 'Booked'
// Adds to calendar, shows capacity
// Email notification of confirmation with calendar event with all the data needed.
  // If class data updates, can send an email notification with updated event details. 

// Cancel a class - 
// Student fills out form to cancel
  // Need a timeline to cancel/hand off class to another instructor.
  // Hand off to another instructor
// Notify instructor of student cancellation
    // If canceled, students need to be given a credit. No refund.
    // Notify Waitlisted students


// If Waitlisted -
// Sign up for waitlist. Fill a form.
// Get an email notification 
// Have the ability to cancel a waitlist. 
// Notify instructors of how many waitlisted. 


export default class StudentBookingController {
  public async index() {
    return { message: 'Student Booking Controller Index' }
  }
}
