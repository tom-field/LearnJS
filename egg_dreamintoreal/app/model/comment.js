'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const CommentSchema = new Schema({
        user_id: {type: ObjectId},
        topic_id: {type: ObjectId},
        content: {type: String},
        reply_count: {type: Number, default: 0},
        ups: [Schema.Types.ObjectId],
        create_at: {type: Date, default: Date.now},
        update_at: {type: Date, default: Date.now},
        deleted: {type: Boolean, default: false},
    }, {
        usePushEach: true,
        toJSON: {virtuals: true},
    });

    CommentSchema.virtual('ups_count').get(function () {
        return this.ups.length;
    });

    CommentSchema.index({user_id: 1, create_at: -1});
    CommentSchema.index({topic_id: 1});

    return mongoose.model('Comment', CommentSchema);
};
