const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  date: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Booking must belong to a Date']
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });
  next();
});

bookingSchema.pre('save', async function(next) {
  const tour = await Tour.findById(this.tour);
  const startDate = tour.startDates.id(this.date);
  console.log(startDate.participants);

  // If there is a maximum number of participants, throw an error.
  if (startDate.participants >= startDate.maxParticipants) {
    return next(
      new AppError(
        'Sorry, but this tour is already sold out. Please book another date.'
      )
    );
  }

  startDate.participants++;
  await tour.save();

  // await tour.save();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
