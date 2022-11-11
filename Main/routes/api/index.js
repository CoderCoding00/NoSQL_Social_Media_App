// EXPRESS ROUTER
const router = require('express').Router();

// THOUGHT AND USER ROUTES
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// ADD PREFIX OF `/thoughts` TO THOUGHT ROUTES (USE IN INSOMNIA TO TEST THE ROUTES)
router.use('/thoughts', thoughtRoutes);
// ADD PREFIX OF `/users` TO USER ROUTES (USE IN INSOMNIA TO TEST THE ROUTES)
router.use('/users', userRoutes);

module.exports = router;