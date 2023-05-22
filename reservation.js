const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  city: String,
  gender: String,
  aadhar: String,
  dob: String,
  seatCount: Number,
  seatPrice: Number
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
