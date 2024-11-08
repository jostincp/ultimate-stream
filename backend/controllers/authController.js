const User = require('../models/User');
const Moderator = require('../models/Moderator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerStreamer = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Streamer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginStreamer = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginModerator = async (req, res) => {
  const { username, password } = req.body;
  try {
    const moderator = await Moderator.findOne({ username });
    if (!moderator) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, moderator.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: moderator._id, streamerId: moderator.streamerId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};