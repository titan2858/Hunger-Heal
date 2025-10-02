const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getAgents, 
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // We can add admin middleware later

router.route('/').get(protect, getAllUsers);
router.route('/agents').get(protect, getAgents);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;