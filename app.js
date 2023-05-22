const express = require('express');
const mongoose = require('mongoose');
const Reservation = require('./reservation');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// mongoose.connect('mongodb://localhost/try1>', { useNewUrlParser: true, useUnifiedTopology: true })

// Connect to MongoDB
mongoose.connect('mongodb://localhost/try1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Store reservation details
app.post('/reservations', (req, res) => {
  const reservation = new Reservation(req.body);
  reservation.save()
    .then(() => res.redirect('/reservations'))
    .catch(err => console.error('Error saving reservation:', err));
});

// Display all reservations
app.get('/reservations', (req, res) => {
  Reservation.find()
    .then(reservations => {
      res.render('reservations', { reservations });
    })
    .catch(err => console.error('Error fetching reservations:', err));
});

// View reservation details
app.get('/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  Reservation.findById(reservationId)
    .then(reservation => {
      if (reservation) {
        res.render('reservation_details', { reservation });
      } else {
        res.send('Reservation not found');
      }
    })
    .catch(err => console.error('Error fetching reservation details:', err));
});

app.listen(3000, () => console.log('Server started on port 3000'));
