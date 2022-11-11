// CREATE THE ROUTER
const router = require('express').Router();

// USING COMMENTS FROM README FILE AS A GUIDE, CREATE THE FOLLOWING ROUTES:

// Import the throughtRoutes

// /api/thoughts (used in insomnia to test the routes)

// /api/thoughts/:id (used in insomnia to test the routes)

// /api/thoughts/:thoughtId/reactions (used in insomnia to test the routes)

// EXPORT THE ROUTER
module.exports = router;

// **** README EXAMPLE TO TEST IN INSOMNIA (THOUGHT ROUTES)
// *** JSON EXAAMPLE TO TEST POST ROUTE FOR THOUGHT IN INSOMNIA ***
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

module.exports = router;

// *** JSON EXAAMPLE TO TEST POST ROUTE FOR REACTION IN INSOMNIA ***
// {
//     "reactions": "Here's a cool reaction...",
//     "username": "lernantino"
// }