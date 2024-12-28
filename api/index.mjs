import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import User from './models/Users.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import imageDownloader from 'image-downloader';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import multer from 'multer';
import Place from './models/Place.js';
import BookingModel from './models/Booking.js';

dotenv.config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 5000;

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = `${__dirname}/uploads`;
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(uploadsDir));
app.use(cors({
  credentials: true,
  origin: ['https://travellodge-frontend.onrender.com', 'https://travellodge-frontend.onrender.com'],
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


  function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
        if (err) reject(err);
        resolve(userData);
      });
    });
  }


// Test route
app.get('/', (req, res) => {
  res.send('Welcome to my Express.js server!');
});

app.get('/test', (req, res) => {
  res.json('test.ok');
});

// User routes
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(422).json({ error: 'Registration failed. ' + error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', email);
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
      if (isPasswordValid) {
        const payload = {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
        };
        console.log('Payload:', payload);
        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
          if (err) {
            console.error('Token generation error:', err);
            return res.status(500).json({ error: 'Token generation failed' });
          }
          console.log('Token generated:', token);
          res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true }).json(userDoc);
        });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, (err, userDoc) => {
      if (err) {
        console.error('Token verification failed:', err);
        return res.status(403).json({ error: 'Token verification failed' });
      }
      res.json(userDoc);
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  console.log('Logout endpoint hit');
  res.cookie('token', '', { sameSite: 'None', secure: true }).json(true);
});

// File upload routes
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  try {
    await imageDownloader.image({
      url: link,
      dest: `${uploadsDir}/${newName}`,
    });
    res.json({ filePath: 'uploads/' + newName }); // Return the relative file path
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Image download failed' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Use uploadsDir variable for destination
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

app.post('/uploads', upload.array('photos', 100), (req, res) => {
  const uploadedFiles = req.files.map(file => 'uploads/' + file.filename);
  res.json(uploadedFiles);
});

// Place routes
app.post('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = req.body;

  if (!token) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  console.log('Token received:', token);

  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ error: 'Token verification failed' });
    }

    try {
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos:addedPhotos ,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      console.log('Place created:', placeDoc);
      res.json(placeDoc);
    } catch (error) {
      console.error('Place creation error:', error);
      res.status(422).json({ error: 'Place creation failed: ' + error.message });
    }
  });
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ error: 'Token verification failed' });
    }

    const { id } = userData;
    try {
      const places = await Place.find({ owner: id });
      res.json(places);
    } catch (error) {
      console.error('Error fetching user places:', error);
      res.status(500).json({ error: 'Failed to fetch user places: ' + error.message });
    }
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ error: 'Place not found' });
    }
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ error: 'Failed to fetch place: ' + error.message });
  }
});

app.put('/places/:id', async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const {
    title, address,addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, photos:addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
      });
      await placeDoc.save();
      res.json('ok');
    } else {
      res.status(403).json({ error: 'Unauthorized to update this place' });
    }
  });
});

app.get('/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Failed to fetch places: ' + error.message });
  }
});

app.post('/booking', async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

    const booking = await BookingModel.create({
      place, checkIn, checkOut,numberOfGuests, name, phone, price,
      user: userData.id,
    });

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Booking creation failed' });
  }
});





app.get('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    const bookings = await BookingModel.find({ user: userData.id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings'.populate('place') });
  }
});



app.listen(port, () => {
  console.log('Server is running on port 5000');
});
