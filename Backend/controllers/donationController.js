const Donation = require('../models/Donation'); // This line is likely missing or incorrect

// @desc    Create a new donation
// @route   POST /api/donations
exports.createDonation = async (req, res) => {
  const { items, address } = req.body;
  try {
    const donation = new Donation({
      items,
      address,
      donor: req.user._id,
    });
    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get donations for the logged-in user (donor)
// @route   GET /api/donations/mydonations
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id });
    res.json(donations);
  } catch (error) { 
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get donations assigned to the logged-in agent
// @route   GET /api/donations/agent
exports.getAgentDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ agent: req.user._id }).populate('donor', 'fullName email');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single donation by ID
// @route   GET /api/donations/:id
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor', 'fullName email');
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all donations (for admin)
// @route   GET /api/donations
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find({}).populate('donor', 'fullName').sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Assign an agent to a donation (by admin)
// @route   PUT /api/donations/:id/assign
exports.assignAgentToDonation = async (req, res) => {
    try {
        const { agentId } = req.body;
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        donation.agent = agentId;
        donation.status = 'Assigned';
        const updatedDonation = await donation.save();
        res.json(updatedDonation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a donation's status (by Admin or Agent)
// @route   PUT /api/donations/:id/status
exports.updateDonationStatus = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        donation.status = req.body.status || donation.status;
        const updatedDonation = await donation.save();
        res.json(updatedDonation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};	