const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, role || 'viewer', hashedPassword]
        );
        res.status(201).json({ message: 'Usuario registrado', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login exitoso', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, role FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
