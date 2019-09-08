<template>
    <div class="user_topic">
        <el-card>
            <div slot="header" class="clearfix">
                <span>用户创建的话题</span>
            </div>
            <ul class="list-unstyled">
                <b-media tag="li" class="my-4" v-for="(item,index) in list" :key="index">
                    <b-img slot="aside" class="pointer" :src="item.author.avatar" width="64" height="64" alt="placeholder" @click="goUserDetail(item.author.loginname)"/>
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
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pager.pageNo"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pager.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pager.totalCount">
            </el-pagination>
        </el-card>
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
                list: [],
                pager: {
                    pageSize: 10,
                    pageNo: 1,
                    totalCount: 0,
                },
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {},
        //方法
        methods: {
            getList() {
                const query = {
                    user_name: this.user_name,
                    pageNo: this.pager.pageNo,
                    pageSize: this.pager.pageSize,
                };
                ApiService.topic.list(query).then(res => {
                    const {code, data, message, totalCount} = res;
                    if (code == 0) {
                        this.list = data;
                        this.pager.totalCount = totalCount;
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
            // 分页
            handleSizeChange(val) {
                this.pager.pageSize = val;
                this.getList();
            },
            handleCurrentChange() {
                this.getList();
            }
        },
        //生命周期函数
        created() {

        },
        beforeMount() {

        },
        mounted() {
            this.user_name = this.$route.query.user_name;
            this.getList();
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
