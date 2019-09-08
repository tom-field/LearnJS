<template>
    <div class="user-messages">
        <el-card shadow="always">
            <div slot="header" class="clearfix">
                <span>未读消息:</span>
            </div>
            <b-media class="message-media" tag="li" v-for="(unreadMessage,index) in unreadMessages" :key="index">
                <b-img slot="aside" :src="unreadMessage.user.avatar" width="30" height="30" alt="头像"/>
                <b-link href="javascript:;" @click="goUserDetail(unreadMessage.user.loginname)">
                    {{unreadMessage.user.loginname}}
                </b-link>
                在你发布的
                <b-link href="javascript:;" @click="goTopicDetail(unreadMessage.topic._id)">{{unreadMessage.topic.title}}</b-link>
                中评论了你的话题
            </b-media>
        </el-card>
        <el-card shadow="always">
            <div slot="header" class="clearfix">
                <span>过往消息:</span>
            </div>
            <b-media class="message-media" tag="li" v-for="(readMessage,index) in readMessages" :key="index">
                <b-img slot="aside" :src="readMessage.user.avatar" width="30" height="30" alt="头像"/>
                <b-link href="javascript:;" @click="goUserDetail(readMessage.user.loginname)">
                    {{readMessage.user.loginname}}
                </b-link>
                在你发布的
                <b-link href="javascript:;" @click="goTopicDetail(readMessage.topic._id)">{{readMessage.topic.title}}
                </b-link>
                话题中发表了评论
            </b-media>
        </el-card>
    </div>
</template>

<script>
    //import  from ''
    import ApiService from '@/service/API-service';
    import {mapGetters} from 'vuex';

    export default {
        //组件名
        name: '',
        //实例的数据对象
        data() {
            return {
                readMessages: [],
                unreadMessages: [],
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters({'userInfo': 'getUserInfo'}),
        },
        //方法
        methods: {
            goUserDetail(loginname) {
                this.$router.push({
                    path: '/user/center',
                    query: {
                        user_name: loginname
                    }
                })
            },
            goTopicDetail(topicId) {
                this.$router.push({
                    path: '/topic/detail',
                    query: {
                        topic_id: topicId
                    }
                })
            },
        },
        //生命周期函数
        created() {
            const query = {
                user_id: this.userInfo._id,
            }
            ApiService.message.getList(query).then(res => {
                const {code, data, message} = res;
                if (code == 0) {
                    this.readMessages = data.readMessages;
                    this.unreadMessages = data.unreadMessages;
                    this.$store.commit('setUnreadMessage', 0);
                } else {
                    this.$message.error(message);
                }
            })
        },
        beforeMount() {

        },
        mounted() {

        },
        //监视
        watch: {},
        //组件
        components: {},
        //过滤器
        filters: {},
        //自定义指令
        directive: {}
    }
</script>

<style lang="scss" scoped>
    .message-media {
        margin-bottom: 20px;
    }
</style>
