
// const { Schema, model, default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');


const userSchema = new Schema(
    {
        // `username` * String * Unique * Required * Trimmed
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        // `email` * String * Unique * Required 
        email: {
            type: String,
            unique: true,
            required: true,
            // USE REGES TO MAKE SURE IT'S AN EMAIL
            match: [/.+@.+\..+/, 'Must match a valid email address']
        },
        // `thoughts` * Array of `ObjectId`s referencing the `Thought` model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // friends  * Array of `ObjectId`s referencing the `User` model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    // toJson use virtuals and getters when data is requested 
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // This will prevent virtuals creating duplicates `id`
        id: false
    }
);
// **Schema Settings**:
// Create a virtual called `friendCount` that retrieves 
// the length of the user's `friends` array field on query.

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

