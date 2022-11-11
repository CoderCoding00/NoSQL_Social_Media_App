const router = require('express').Router();

// USED COMMENTS FROM THE README FILE TO DESCRIBE

// Import the userRoutes
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,

} = require('../../controllers/userController');

// Set up GET all users and POST *** /api/users (used in insomnia to test the routes)
router
    .route('/')
    .get(getAllUsers)
    .post(createUser, addFriend, deleteFriend);

// Set up GET one, PUT, and DELETE *** /api/users/:id (used in insomnia to test the routes)
router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// Set up POST and DELETE *** /api/users/:userId/friends/:friendId (used in insomnia to test the routes)
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
