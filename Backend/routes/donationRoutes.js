const express = require('express');
const router = express.Router();
const { 
    createDonation, 
    getMyDonations, 
    getAgentDonations,
    getDonationById,
    getAllDonations, 
    assignAgentToDonation,
    updateDonationStatus
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// The single, correct route for creating donations (with image upload) and getting all donations
router.route('/')
  .post(protect, upload.single('foodImage'), createDonation)
  .get(protect, getAllDonations);

router.route('/mydonations').get(protect, getMyDonations);
router.route('/agent').get(protect, getAgentDonations);
router.route('/:id').get(protect, getDonationById);
router.route('/:id/status').put(protect, updateDonationStatus);
router.route('/:id/assign').put(protect, assignAgentToDonation);

module.exports = router;