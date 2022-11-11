// EXPRESS ROUTER
const router = require('express').Router();

// API ROUTES (THOUGHT AND USER)
const apiRoutes = require('./api');

// ADD PREFIX OF `/api` TO THOUGHT AND USER ROUTES (USE IN INSOMNIA TO TEST THE ROUTES)
router.use('/api', apiRoutes);

// ERROR HANDLER FOR INVALID ROUTES
router.use((req, res) => { res.status(404).send('Error... Wrong Route.') });

module.exports = router;