import express from 'express';
import { adminAuth } from '../middlewares/auth.js'

import { registerAdmin, adminLogin } from '../Controllers/userController.js';

import { createTheatre } from '../Controllers/theatreController.js';
import { createMovies, showSeats, seatBooking } from '../Controllers/moviesController.js';

const router = express.Router();

router.post('/registerAdmin', registerAdmin)
router.post('/adminLogin', adminLogin)
router.post('/createTheatre/:adminId', adminAuth, createTheatre)
router.post('/createMovies/:adminId', adminAuth, createMovies)

router.get('/showSeats', showSeats)

router.post('/seatBooking', seatBooking)





export default router