const express = require('express')
const router = express.Router()
const controladorAutenticacion=require('../controladores/controladorAutenticacion')

// Rutas de autenticacion

router.post('/registrar', controladorAutenticacion.registrarUsuario)
router.post('/login', controladorAutenticacion.iniciarSesion)

module.exports = router;