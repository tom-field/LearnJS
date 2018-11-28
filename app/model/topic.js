'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const TopicSchema = new Schema({
        title: {type: String},
        content: {type: String},
        author_id: {type: ObjectId},
        top: {type: Boolean, default: false}, // 置顶帖
        good: {type: Boolean, default: false}, // 精华帖
        lock: {type: Boolean, default: false}, // 被锁定主题
        visit_count: {type: Number, default: 0},
        comment_count: {type: Number, default: 0},
        today_comment_count: {type: Number, default: 0}, //今日评论数 每天定时任务归零
        reply_count: {type: Number, default: 0},
        collect_count: {type: Number, default: 0},
        create_at: {type: Date, default: Date.now},
        update_at: {type: Date, default: Date.now},
        last_comment_id: {type: ObjectId},
        last_comment_at: {type: Date, default: Date.now},
        last_reply: {type: ObjectId},
        last_reply_at: {type: Date, default: Date.now},
        content_is_html: {type: Boolean},
        tab: {type: String},
        ups: [Schema.Types.ObjectId],
        deleted: {type: Boolean, default: false},
    }, {
        toJSON: {virtuals: true}
    });

    TopicSchema.virtual('ups_count').get(function () {
        return this.ups.length;
    });

    TopicSchema.index({create_at: -1});
    TopicSchema.index({top: -1, last_reply_at: -1});
    TopicSchema.index({author_id: 1, create_at: -1});

    return mongoose.model('Topic', TopicSchema);
};