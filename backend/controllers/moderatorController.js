const Moderator = require('../models/Moderator');

exports.getModerators = async (req, res) => {
  try {
    const moderators = await Moderator.find();
    res.json(moderators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addModerator = async (req, res) => {
  const { username, password, streamerId } = req.body;
  try {
    const moderator = new Moderator({ username, password, streamerId });
    await moderator.save();
    res.status(201).json(moderator);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};