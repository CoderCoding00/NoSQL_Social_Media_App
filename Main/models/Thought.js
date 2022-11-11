const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//`thoughtText`* String * Required * Must be between 1 and 280 characters
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // `createdAt`* Date * Set default value to the current timestamp * Use a getter method to format the timestamp on query
        createdAt: {
            type: Date,
            default: Date.now
        },

        // `username`(The user that created this thought) * String * Required
        username: {
            type: String,
            required: true
        },
        // `reactions`(These are like replies) * Array of nested documents created with the `reactionSchema`
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// **Schema Settings**:
// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

//Thought MODEL USING ThoughtSchema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;


