const { Router } = require('express')

const usersRoutes = require('./users/userRoutes')
const categoriesRoutes = require('./categories/categoryRoutes')
const accountsRoutes = require('./accounts/accountRoutes')
const movementsRoutes = require('./movements/movementRoutes')
const currenciesRoutes = require('./currencies/currencyRoutes')

const router = Router()

router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/accounts', accountsRoutes)
router.use('/movements', movementsRoutes)
router.use('/currencies', currenciesRoutes)

module.exports = router
