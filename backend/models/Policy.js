const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    area: { type: String, required: true },
    indicators: [
        {
            name: String,
            value: Number,
            target: Number,
            lastUpdated: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Policy', PolicySchema);
