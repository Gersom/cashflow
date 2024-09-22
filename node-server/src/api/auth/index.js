const { Router } = require('express')

const loginRoutes = require('./login/login.routes')
const registerRoutes = require('./register/registerRoutes')
const recoverRoutes = require('./recover/recover.routes')
const tokenRoutes = require('./token/tokenRoutes')

const router = Router()

router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/recover-password', recoverRoutes)
router.use('/token', tokenRoutes)

module.exports = router
