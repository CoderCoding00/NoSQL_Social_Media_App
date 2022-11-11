// **REACTION IS A SCHEMA ONLY **:
// This will not be a model, but rather will be used as the 
// `reaction` field's subdocument schema in the `Thought` model.

const { Schema, Types } = require('mongoose');

// * `reactionId`  * Use Mongoose's ObjectId data type 
//  * Default value is set to a new ObjectId
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // * `reactionBody` * String * Required * 280 character maximum
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        // * `username` * String * Required
        username: {
            type: String,
            required: true
        },
        // * `createdAt` * Date * Set default value to the current timestamp
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;