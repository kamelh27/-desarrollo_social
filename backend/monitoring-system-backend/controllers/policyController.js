const Policy = require('../models/Policy');

exports.getPolicies = async (req, res) => {
    try {
        const policies = await Policy.find();
        res.json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPolicy = async (req, res) => {
    const policy = new Policy(req.body);
    try {
        const newPolicy = await policy.save();
        res.status(201).json(newPolicy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePolicy = async (req, res) => {
    try {
        const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!policy) return res.status(404).json({ message: 'Política no encontrada' });
        res.json(policy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePolicy = async (req, res) => {
    try {
        const policy = await Policy.findByIdAndDelete(req.params.id);
        if (!policy) return res.status(404).json({ message: 'Política no encontrada' });
        res.json({ message: 'Política eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
