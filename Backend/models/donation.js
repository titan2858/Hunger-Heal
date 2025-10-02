const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: String, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'Collected', 'Rejected'],
    default: 'Pending',
  },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;