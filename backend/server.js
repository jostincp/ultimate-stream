const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const moderatorRoutes = require('./routes/moderatorRoutes');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/moderators', moderatorRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});