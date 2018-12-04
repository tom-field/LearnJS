<template>
    <div class="user-tops">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户积分榜:</span>
            </div>
            <el-table
                    :data="topUsers"
                    style="width: 100%">
                <el-table-column
                        prop="loginname"
                        label="用户名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="score"
                        label="积分">
                </el-table-column>
                <el-table-column
                        prop="topic_count"
                        label="主题数">
                </el-table-column>
                <el-table-column
                        prop="comment_count"
                        label="评论数">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pager.pageNo"
                    :page-sizes="[20, 30, 50]"
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
                topUsers: [],
                pager: {
                    pageSize: 20,
                    pageNo: 1,
                    totalCount: 0,
                }
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
                    pageSize: 10,
                    pageNo: 1
                }
                ApiService.user.topUsers(query).then(res => {
                    const {code, data, message, totalCount} = res;
                    if (code == 0) {
                        this.topUsers = data;
                        this.pager.totalCount = totalCount;
                    } else {
                        this.$message.error(message)
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
            this.getList();
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

</style>
