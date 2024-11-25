const express = require('express');
const { registerUser, loginUser, getUsers, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;
