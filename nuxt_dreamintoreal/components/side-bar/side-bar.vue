<template>
    <div class="side-bar">
        <el-card shadow="hover">
            <el-button v-if="Object.keys(userInfo).length" type="primary" @click="publishTopic">发布话题</el-button>
            <p v-else>登录进行更多操作</p>
        </el-card>
        <el-card shadow="hover" v-if="Object.keys(userInfo).length">
            <div slot="header" class="clearfix">
                <span>个人信息:</span>
            </div>
            <b-media tag="li" class="mb-2">
                <b-img slot="aside" class="pointer" :src="userInfo.avatar || userInfo.avatar_url" @click="goUserDetail(userInfo.loginname)"
                       width="40" height="40" alt="头像"/>
                <h5 class="mt-0 mb-1">{{userInfo.loginname}}</h5>
            </b-media>
            <p style="word-break: break-all;" v-if="!userInfo.signature">这家伙很懒,什么个性签名都没留下。</p>
            <p style="word-break: break-all;" v-else>个性签名: {{userInfo.signature}}</p>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <b-link href="javascript:;" @click="$router.push('/user/tops')">用户积分榜>>></b-link>
            </div>
            <b-media class="mb-2" tag="div" v-for="(item,index) in topUsers" :key="index">
                <b-img slot="aside" class="pointer" :src="item.avatar || item.avatar_url" width="40" height="40"
                       alt="头像"
                       @click="goUserDetail(item.loginname)"/>
                <b-link href="javascript:;" @click="goUserDetail(item.loginname)">{{item.loginname}}</b-link>
            </b-media>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>今日热议:</span>
            </div>
            <b-link v-for="(item,index) in todayHotTopics" :key="index" href="javascript:;" @click="goTopicDetail(item._id)">{{item.title}}</b-link>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>运营状况:</span>
            </div>
            <p>注册人数:</p>
            <p>主题数:</p>
            <p>评论数:</p>
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
                currentPath: this.$route.path,
                todayHotTopics: [],
                topUsers: [],
                showAuthor: false,
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
            getTopUsers() {
                const query = {
                    pageSize: 10,
                    pageNo: 1
                }
                ApiService.user.topUsers(query).then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.topUsers = data;
                    } else {
                        this.$message.error(message)
                    }
                })
            },
            getTodayHotTopics() {
                ApiService.topic.todayHotTopics().then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.todayHotTopics = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            publishTopic() {
                this.$router.push('/topic/create');
            },
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
            this.getTopUsers();
            this.getTodayHotTopics();
        },
        beforeMount() {

        },
        mounted() {

        },
        //监视
        watch: {
            '$route'(to, from) {
                if (to.path == '/topic_detail') {
                    this.showAuthor = true;
                } else {
                    this.showAuthor = false;
                }
            }
        },
        //组件
        components: {},
        //过滤器
        filters: {},
        //自定义指令
        directive: {}
    }
</script>

<style lang="scss" scoped>
    .side-bar {
        margin-left: 20px;
    }
</style>
