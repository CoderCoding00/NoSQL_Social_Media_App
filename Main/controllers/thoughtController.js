// **`/api/thoughts`**
const { Thought, } = require('../models');
const router = require('express').Router();

// CREATE CONST FOR THOUGHT CONTROLLER TO EXPORT
const thoughtController = {
    // * `GET` to get all thoughts
    getThought(req, res) {
        Thought.find({})
            .select('-__v')
            .then(Thought => res.json(Thought))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // * `GET` to get a single thought by its `_id`
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found with this id.!' });
                    return;
                }
                res.json(Thought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // * `POST` to create a new thought push the created thought's `_id` to the associated user's `thoughts` array field
    createNewThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate({ _id: params.userId },
                    { $push: { thought: _id } },
                    { new: true });
            })
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found with this id.' });
                    return;
                }
                res.json(Thought)
            })
            .catch(err => res.json(err));
    },
    // * `PUT` to update a thought by its `_id`
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found with this id.' });
                    return;
                }
                res.json(Thought);
            })
            .catch(err => res.status(400).json(err));
    },
    // * `DELETE` to remove a thought by its `_id`
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found with this id.!' });
                    return;
                }
                res.json(Thought);
            })
            .catch(err => res.status(400).json(err));
    },
    // * `POST` to create a reaction stored in a single thought's `reactions` array field
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .then(data => {
                console.log(data);
                if (!data) {
                    res.status(404).json({ message: 'Thought not found with this id.!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
            .then(Thought => res.json(Thought))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;

// *** JSON EXAAMPLE TO TEST POST ROUTE INSOMNIA ***
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

