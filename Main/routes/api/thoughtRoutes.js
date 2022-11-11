// CREATE THE ROUTER
const router = require('express').Router();

// Import the throughtRoutes
const {
    getThought,
    getThoughtById,
    createNewThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');


// /api/thoughts (used in insomnia to test the routes)
router
    .route('/')
    .get(getThought)
    .post(createNewThought);

// /api/thoughts/:id (used in insomnia to test the routes)
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions (used in insomnia to test the routes)
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId (used in insomnia to test the routes)
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;

// *** JSON EXAAMPLE TO TEST POST ROUTE FOR THOUGHT IN INSOMNIA ***
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

// *** JSON EXAAMPLE TO TEST POST ROUTE FOR REACTION IN INSOMNIA ***
// {
//     "reactions": "Here's a cool reaction...",
//     "username": "lernantino"
// }