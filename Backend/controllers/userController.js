const User = require('../models/user');

// @desc    Get all users
// @route   GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all agents
// @route   GET /api/users/agents
exports.getAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: 'agent' }).select('fullName');
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getUserProfile = async (req, res) => {
  // req.user is attached by the 'protect' middleware
  res.json(req.user);
};

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.address = req.body.address || user.address;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      address: updatedUser.address,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};