const Review = require('./../models/reviewModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');

const factory = require('./handlerfactory');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.restrictReviews = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user.id
  });

  const tourIds = bookings.map(el => el.tour.id);

  const booked = tourIds.some(el => el === req.body.tour);
  if (!booked) {
    return next(new AppError('There is no booking for this tour', 404));
  }

  next();
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
