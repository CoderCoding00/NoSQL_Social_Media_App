const { User, Thought, Reaction } = require('../models');
const router = require('express').Router();

// **`/api/users`**

// CREATE CONST FOR USER CONTROLLER TO EXPORT
const userController = {
    // * `GET` all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            // SORT IN DESCENDING ORDER (-1)
            .sort({ _id: -1 })
            .then(User => res.json(User))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // * `GET` a single user by its `_id` and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'Not a valid id!' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.status(400).json(err));
    },

    // * `POST` a new user:
    createUser({ body }, res) {
        User.create(body)
            .then(User => res.json(User))
            .catch(err => res.status(400).json(err));
    },

    // * `PUT` to update a user by its `_id`
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'Not a valid id!' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.status(400).json(err));
    },
    // * `DELETE` to remove user by its `_id`
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'Not a valid id!' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.status(400).json(err));
    },

    // ****  BONUS: Delete a user's associated thoughts when deleted. ****



    // * `POST` to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true })

            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'Not a valid id!' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.json(err));
    },

    // * `DELETE` to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true })
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'User not found!' });
                    return;
                }
                res.json(User)
            })

            .catch(err => res.json(err));
    },

    // **BONUS**: Remove a user's associated thoughts when deleted  ****
};

module.exports = userController;


// JSON EXAMPLE DATA TO TEST IN INSOMNIA

// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }