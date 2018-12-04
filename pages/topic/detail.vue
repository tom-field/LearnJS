<template>
    <div class="topic_detail">
        <!--评论弹框-->
        <el-dialog width="50%" :title="commentDialog.title" :visible.sync="commentDialog.visible">
            <el-form>
                <el-form-item label="" label-width="80px;">
                    <markdown-editor id="commentEditor" ref="commentEditor" v-model="commentDialog.content"
                                     :height="200"
                                     :z-index="20"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="commentDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="commentDialogConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!--TODO 暂时放这里,后面看看放其他地方-->
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <h5>{{topic.title}}</h5>
                <div>
                    作者:{{author.loginname}} | 主题:{{topic.tab | tab}} | 发布时间:{{topic.createTime | dateTime}}
                </div>
                <div>
                    <el-button type="text" icon="fa fa-thumbs-o-up" @click="upTopic"> 赞 {{topic.ups_count}}</el-button>
                    <el-button type="text" :icon="collected?'el-icon-star-on':'el-icon-star-off'"
                               @click="collectTopic(collected)"></el-button>
                    <el-button type="text">
                        收藏数:{{topic.collect_count || 0}}
                    </el-button>
                    <el-button type="text" icon="el-icon-edit" v-if="topic.author_id == userInfo._id"
                               @click="updateTopic">
                        更新
                    </el-button>
                    <el-button type="text" icon="el-icon-delete" v-if="topic.author_id == userInfo._id"
                               @click="deleteTopic">删除
                    </el-button>
                    <el-button type="text" icon="el-icon-share">分享</el-button>
                </div>
            </div>
            <div v-html="topic.html"></div>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>精彩评论:</span>
            </div>
            <div v-if="!comments.length">
                暂无评论,抢个沙发?
            </div>
            <div class="reply-container">
                <b-media v-for="(comment,commentIndex) in comments" :key="commentIndex">
                    <b-img slot="aside" :src="comment.user.avatar || comment.user.avatar_url" width="30" height="30" alt="头像"
                           class="pointer"
                           @click="goUserDetail(comment.user.loginname)"/>
                    <p class="mt-0">{{comment.user.loginname}}</p>
                    <div v-html="comment.html"></div>
                    <p>
                        <span>{{comment.create_at | dateTime}}</span>
                        <el-button type="text" icon="fa fa-thumbs-o-up" @click="upComment(commentIndex,comment._id)">
                            {{comment.ups_count}}
                        </el-button>
                        <el-button type="text" @click="showCommentDialog('commentReply',comment)">回复</el-button>
                        <el-button type="text" v-if="userInfo._id === comment.user._id"
                                   @click="showCommentDialog('commentEdit',comment)">编辑
                        </el-button>
                        <el-button type="text" v-if="userInfo._id === comment.user._id"
                                   @click="delComment(commentIndex,comment._id)">删除
                        </el-button>
                    </p>
                    <hr>
                    <b-media v-for="(reply,replyIndex) in comment.replies" :key="replyIndex">
                        <b-img slot="aside" :src="reply.user.avatar|| reply.user.avatar_url" width="30" height="30" alt="头像"
                               class="pointer"
                               @click="goUserDetail(reply.user.loginname)"/>
                        <p class="mt-0"><span>{{reply.user.loginname}}</span> <span v-if="reply.replyTo!=null">回复</span> <span v-if="reply.replyTo!=null">{{reply.replyTo.loginname}}</span> </p>
                        <div v-html="reply.content"></div>
                        <p>
                            <span>{{reply.create_at | dateTime}}</span>
                            <el-button type="text" @click="showCommentDialog('replyReply',comment,replyIndex)">回复</el-button>
                            <el-button type="text" v-if="userInfo._id === reply.user._id"
                                       @click="delReply(commentIndex,replyIndex,reply._id)">删除
                            </el-button>
                        </p>
                        <hr>
                    </b-media>
                </b-media>
                <!--<b-media>
                    <b-img slot="aside" blank blank-color="#ccc" width="40" alt="placeholder"/>
                    <h5 class="mt-0">Media Title</h5>
                    <p>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                        Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                        in faucibus.
                    </p>
                    <hr>
                    <b-media>
                        <b-img slot="aside" blank blank-color="#ccc" width="40" alt="placeholder"/>
                        <h5 class="mt-0">Media Title</h5>
                        <p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                            sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                            Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                            in faucibus.
                        </p>
                        <hr>
                    </b-media>
                </b-media>-->
            </div>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>添加评论:</span>
            </div>
            <div class="write-content" v-if="Object.keys(userInfo).length">
                <div class="reply-content">
                    <markdown-editor id="contentEditor" ref="contentEditor" v-model="commentContent" :height="200"
                                     :z-index="20"/>
                </div>
                <div style="margin-top: 50px;">
                    <el-button type="primary" @click="commentTopic">发表评论</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    //import  from ''
    import ApiService from '@/service/API-service';
    import {mapGetters} from 'vuex';
    import showdown from 'showdown';
    import MarkdownEditor from '@/components/MarkdownEditor'

    export default {
        //组件名
        name: '',
        //实例的数据对象
        data() {
            return {
                html: '',
                topic: {},
                collected: false,
                author: {},
                comments: [],
                commentDialog: {
                    type: '',
                    visible: false,
                    comment_id: '',
                    content: '',
                },
                commentContent: '',
            };
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters({'userInfo': 'getUserInfo'}),
        },
        //方法
        methods: {
            getDetail() {
                const query = {
                    topic_id: this.$route.query.topic_id,
                }
                ApiService.topic.detail(query).then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.author = data.author;
                        //作者话题转换html
                        data.topic.html = this.markdown2Html(data.topic.content);
                        this.topic = data.topic;
                        this.collected = data.collected;
                        for (let i = 0; i < data.comments.length; i++) {
                            let comment = data.comments[i];
                            comment.html = this.markdown2Html(comment.content);
                        }
                        this.comments = data.comments;
                    } else {
                        this.$message.error(message)
                    }
                })
            },
            markdown2Html(content) {
                const converter = new showdown.Converter()
                return converter.makeHtml(content);
            },
            upTopic() {
                const userInfo = this.userInfo;
                if (!userInfo._id) {
                    this.$message.error('登录后才能进行收藏操作');
                    return;
                }
                const query = {
                    topic_id: this.topic._id,
                    user_id: userInfo._id,
                }
                ApiService.topic.up(query).then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.getDetail();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            upComment(index, commentId) {
                const userInfo = this.userInfo;
                if (!userInfo._id) {
                    this.$message.error('登录后才能进行点赞操作');
                    return;
                }
                const query = {
                    user_id: userInfo._id,
                    comment_id: commentId,
                }
                ApiService.comment.up(query).then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.comments[index].ups_count += 1;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            //更新评论
            showCommentDialog(type, comment,replyIndex) {
                let commentDialog = this.commentDialog;
                if (type == 'commentReply') {
                    commentDialog.type = 'commentReply';
                    commentDialog.visible = true;
                    commentDialog.comment_id = comment._id;
                    commentDialog.reply_id = '';
                    commentDialog.content = '';
                } else if (type == 'commentEdit') {
                    commentDialog.type = 'commentEdit';
                    commentDialog.visible = true;
                    commentDialog.comment_id = comment._id;
                    commentDialog.reply_id = '';
                    commentDialog.content = comment.content;
                } else if(type == 'replyReply') {
                    commentDialog.type = 'replyReply';
                    commentDialog.visible = true;
                    commentDialog.comment_id = comment._id;
                    commentDialog.reply_id = comment.replies[replyIndex]['_id'];
                    commentDialog.content = '';
                }
            },
            commentDialogConfirm() {
                let commentDialog = this.commentDialog;
                const query = {
                    user_id: this.userInfo._id,
                    comment_id: commentDialog.comment_id,
                    reply_id: commentDialog.reply_id,
                    content: commentDialog.content,
                }
                if (!query.comment_id) {
                    this.$message.error('缺少评论ID');
                    return;
                }
                if (!query.content) {
                    this.$message.error('内容不能为空');
                    return;
                }
                if (commentDialog.type == 'commentReply') {
                    ApiService.reply.add(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.commentDialog.visible = false;
                            this.getDetail();
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else if (commentDialog.type == 'commentEdit') {
                    ApiService.comment.edit(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.commentDialog.visible = false;
                            this.getDetail();
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else if (commentDialog.type = 'replyReply') {
                    ApiService.reply.add(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.commentDialog.visible = false;
                            this.getDetail();
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            //删除评论
            delComment(index, commentId) {
                const userInfo = this.userInfo;
                if (!userInfo._id) {
                    this.$message.error('登录后才能进行删除操作');
                    return;
                }
                this.$confirm('确定删除该条评论, 是否继续?', '提示', {
                    center: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const query = {
                        user_id: userInfo._id,
                        comment_id: commentId,
                    }
                    ApiService.comment.delete(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.comments.splice(index, 1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                })
            },
            //删除回复
            delReply(commentIndex, replyIndex, replyId) {
                const userInfo = this.userInfo;
                if (!userInfo._id) {
                    this.$message.error('登录后才能进行删除操作');
                    return;
                }
                this.$confirm('确定删除该条评论, 是否继续?', '提示', {
                    center: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const query = {
                        user_id: userInfo._id,
                        reply_id: replyId,
                    }
                    ApiService.reply.delete(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.comments[commentIndex].replies.splice(replyIndex, 1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                })
            },
            collectTopic(is_collected) {
                const userInfo = this.userInfo;
                if (!userInfo._id) {
                    this.$message.error('登录后才能进行收藏操作');
                    return;
                }
                const query = {
                    topic_id: this.topic._id,
                    user_id: userInfo._id,
                }
                if (is_collected) {
                    ApiService.topic.cancelCollect(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.collected = false;
                            this.topic.collect_count = data;
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    ApiService.topic.collect(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.collected = true;
                            this.topic.collect_count = data;
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            // 对topic进行回复
            commentTopic() {
                if (!this.commentContent) {
                    this.$message.error('评论不能为空');
                    return;
                }
                const query = {
                    topic_id: this.$route.query.topic_id,
                    user_id: this.userInfo._id,
                    content: this.commentContent,
                }
                ApiService.comment.add(query).then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.$message.success("评论成功");
                        this.commentContent = '';
                        this.getDetail();
                    } else {
                        this.$message.error(message)
                    }
                })
            },
            goUserDetail(loginname) {
                this.$router.push({
                    path: '/user/center',
                    query: {
                        user_name: loginname
                    }
                })
            },
            updateTopic() {
                this.$router.push({
                    path: '/topic/update',
                    query: {
                        topic_id: this.topic._id,
                    }
                })
            },
            deleteTopic() {
                this.$confirm('确定删除该话题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const query = {
                        user_id: this.userInfo._id,
                        topic_id: this.topic._id,
                    }
                    ApiService.topic.delete(query).then(res => {
                        const {code, data, message} = res;
                        if (code == 0) {
                            this.$router.push('/');
                        } else {
                            this.$message.error(message);
                        }
                    })
                }).catch(() => {
                    consle.log("取消删除");
                });
            },
        },
        //生命周期函数
        created() {
            this.getDetail();
        },
        beforeMount() {

        },
        mounted() {

        },
        //监视
        watch: {},
        //组件
        components: {
            MarkdownEditor,
        },
        //过滤器
        filters: {},
        //自定义指令
        directive: {}
    }
</script>

<style lang="scss" scoped>
    .tie-list {
        list-style: none;
    }

    .tie-box {
        position: relative;
        padding: 0 0 20px 0;
        border-bottom: 1px solid #dad6d6;
        zoom: 1;
        overflow: visible;
    }

    .tie-box .user-avatar {
        position: absolute;
        left: 0;
        top: 25px;
        cursor: pointer;
        width: 35px;
        height: 35px;
        img {
            display: block;
            width: 35px;
            height: 35px;
        }
    }

    .tie-box .user-content {
        padding-left: 55px;
        .tie-header {
            color: #999;
            font-size: 12px;
            .user-info {
                .user-name {
                    margin-right: 10px;
                    color: #007ed7;
                    text-decoration: none;
                    cursor: pointer;
                }
            }
            .post-time {
                float: right;
            }
        }
        .tie-content {
            padding: 6px 0;
            color: #2b2b2b;
            line-height: 24px;
            font-size: 14px;
            word-break: break-all;
            word-wrap: break-word;
        }
    }
</style>
