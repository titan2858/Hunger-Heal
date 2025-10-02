    const express = require('express');
    const router = express.Router();
    const { 
    createDonation, 
    getMyDonations, 
    getAgentDonations, 
    getDonationById, 
    updateDonationStatus,
    getAllDonations, 
    assignAgentToDonation 
    } = require('../controllers/donationController');
    const { protect } = require('../middleware/authMiddleware');

    router.route('/').post(protect, createDonation).get(protect, getAllDonations);
    router.route('/mydonations').get(protect, getMyDonations);
    router.route('/agent').get(protect, getAgentDonations); // New
    router.route('/:id').get(protect, getDonationById); // New
    router.route('/:id/status').put(protect, updateDonationStatus); // New
    router.route('/:id/assign').put(protect, assignAgentToDonation);

    module.exports = router;