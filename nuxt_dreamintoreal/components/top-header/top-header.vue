<template>
    <el-header>
        <div class="content-box top-header clearfix">
            <el-menu
                    router
                    :default-active="$route.path"
                    class="el-menu-demo fl"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="/">首页</el-menu-item>
                <!--<el-menu-item index="/getstart">新手入门</el-menu-item>
                <el-menu-item index="/api">API</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>-->
            </el-menu>
            <div class="fr" style="line-height: 60px;">
                <el-button v-if="!Object.keys(userInfo).length" type="text" @click="$router.push('/sign/signup')">注册
                </el-button>
                <el-button v-if="!Object.keys(userInfo).length" type="text" @click="$router.push('/sign/signin')">登录
                </el-button>
                <el-button v-if="Object.keys(userInfo).length" type="text" @click="goUserCenter">
                    {{userInfo.loginname}}
                </el-button>
                <el-button v-if="Object.keys(userInfo).length" type="text" @click="">
                    <el-badge :value="unreadMessage==0?'':unreadMessage" class="item">
                        <el-button type="text" @click="$router.push('/user/messages')">我的消息</el-button>
                    </el-badge>
                </el-button>
                <el-button v-if="Object.keys(userInfo).length" type="text" @click="$router.push('/user/settings')">设置
                </el-button>
                <el-button v-if="Object.keys(userInfo).length" type="text" @click="logout">退出</el-button>
            </div>
        </div>
    </el-header>
</template>

<script>
    //import  from ''
    import ApiService from '@/service/API-service';
    import {mapState,mapGetters} from 'vuex';

    export default {
        //组件名
        name: '',
        //实例的数据对象
        data() {
            return {}
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters({'userInfo': 'getUserInfo'}),
            ...mapState(['unreadMessage'])
        },
        //方法
        methods: {
            goUserCenter() {
                this.$router.push({
                    path: '/user/center',
                    query: {
                        user_name: this.userInfo.loginname,
                    }
                })
            },
            logout() {
                ApiService.user.signout().then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.$store.commit('clearUserInfo');
                        this.$router.push('/');
                        this.$message.success('退出成功');
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleSelect() {

            },
            handleOpen() {

            },
            handleClose() {

            }
        },
        //生命周期函数
        created() {

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
