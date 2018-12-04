<template>
    <div class="user_center">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
            </div>
            <b-media tag="li" class="my-4" v-if="userDetail">
                <b-img slot="aside" class="pointer" :src="userDetail.avatar|| userDetail.avatar_url" width="64" height="64" alt="头像"/>
                <p>
                    用户名: {{userDetail.loginname}}
                </p>
                <p>
                    积分: {{userDetail.score}}
                </p>
                <p>
                    签名: {{userDetail.signature}}
                </p>
                <p>
                    位置: {{userDetail.location}}
                </p>
                <p>
                    微博: {{userDetail.weibo}}
                </p>
                <p>
                    个人网址: {{userDetail.url}}
                </p>
            </b-media>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>最近创建的话题</span>
            </div>
            <ul class="list-unstyled">
                <b-media tag="li" class="my-4" v-for="(item,index) in recentTopics" :key="index">
                    <h6 class="mt-0 mb-1">
                        <a href="javascript:;" @click="goTopicDetail(item._id)">{{item.title}}</a>
                    </h6>
                    <div style="margin-top: 20px;">
                        • <span class="source">主题:{{item.tab | tab}}</span>
                        • <span>作者:<b-link href="javascript:;"
                                           @click="goUserDetail(item.author.loginname)">{{item.author.loginname}}</b-link></span>
                        • <span>收藏：{{item.collect_count || 0}}</span>
                        • <span>浏览：{{item.visit_count}}</span>
                        • <span>评论：{{item.comment_count}}</span>
                    </div>
                </b-media>
            </ul>
            <b-link href="javascript:;" @click="lookMyTopics">查看更多>></b-link>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>最近收藏的话题</span>
            </div>
            <ul class="list-unstyled">
                <b-media tag="li" class="my-4" v-for="(item,index) in collectedTopics" :key="index">
                    <h6 class="mt-0 mb-1">
                        <a href="javascript:;" @click="goTopicDetail(item._id)">{{item.title}}</a>
                    </h6>
                    <div style="margin-top: 20px;">
                        • <span class="source">主题:{{item.tab | tab}}</span>
                        • <span>作者:<b-link href="javascript:;"
                                           @click="goUserDetail(item.author.loginname)">{{item.author.loginname}}</b-link></span>
                        • <span>收藏：{{item.collect_count || 0}}</span>
                        • <span>浏览：{{item.visit_count}}</span>
                        • <span>评论：{{item.comment_count}}</span>
                    </div>
                </b-media>
            </ul>
            <b-link href="javascript:;" @click="lookCollecedTopics">查看更多>></b-link>
        </el-card>
        <div></div>
        <!--<div>个人信息</div>
        <div>最近创建的话题:</div>
        <div>最近参与的话题:</div>-->
    </div>
</template>

<script>
    //import  from ''
    import ApiService from '@/service/API-service';

    export default {
        //组件名
        name: '',
        //实例的数据对象
        data() {
            return {
                user_name: '',
                userDetail: null,
                recentTopics: [],
                collectedTopics: [],
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {},
        //方法
        methods: {
            getDetail() {
                const query = {
                    user_name: this.user_name,
                }
                ApiService.user.detail(query).then(res => {
                    let {code, data, message} = res;
                    if (code == 0) {
                        this.userDetail = data.user;
                        this.recentTopics = data.recent_topics;
                        this.collectedTopics = data.collected_topics;
                    } else {
                        alert(message);
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
            goTopicDetail(topicId) {
                this.$router.push({
                    path: '/topic/detail',
                    query: {
                        topic_id: topicId
                    }
                })
            },
            lookMyTopics() {
                this.$router.push({
                    path: '/user/topics',
                    query: {
                        user_name: this.user_name,
                    }
                })
            },
            lookCollecedTopics() {
                this.$router.push({
                    path: '/user/collected_topics',
                    query: {
                        user_name: this.user_name,
                    }
                })
            }
        },
        //生命周期函数
        created() {

        },
        beforeMount() {

        },
        mounted() {
            this.user_name = this.$route.query.user_name;
            this.getDetail();
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

</style>
