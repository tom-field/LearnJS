<template>
    <div class="active-account">
        {{message}}
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
                message: '',
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {},
        //方法
        methods: {
            activeAccount(){
                let query = this.$route.query;
                ApiService.user.activeAccount(query).then(res=>{
                    let {code, data, message} = res;
                    if(code == '0'){
                        this.message = '帐号激活成功';
                    }else{
                        this.message = message;
                    }
                    setTimeout(()=>{
                        this.$router.push('/');
                    },1000)
                })
            }
        },
        //生命周期函数
        created() {
            this.activeAccount();
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
