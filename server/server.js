const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './server/.env' });
console.log('Using MONGO_URI:', process.env.MONGO_URI);
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('da konacno radi'))
.catch((err) => console.error(' MongoDB works sweety', err));


const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sradi na portu ${PORT}`);
}); //pokreni ga 


const User = require('./models/User'); 

app.post('/user', async (req, res) => {
  const { name, email, password, country } = req.body;
  try {
    const newUser = new User({ name, email, password, country });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message }); //daj mi tacan error 
  }
});


