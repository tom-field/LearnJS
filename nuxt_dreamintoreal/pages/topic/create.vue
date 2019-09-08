<template>
    <div class="topic-create">
        <el-card shadow="always">
            <div class="choose">
                选择板块:
                <el-select v-model="tab">
                    <el-option
                            v-for="item in tabs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-input class="title" v-model="title" placeholder="请输入标题"></el-input>
            <div class="editor-container">
                <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :z-index="20"/>
            </div>
            <el-button type="primary" @click="publish">发布</el-button>
        </el-card>
    </div>
</template>

<script>
    //import  from ''
    import ApiService from '@/service/API-service';
    import {mapState,mapGetters} from 'vuex';
    import MarkdownEditor from '@/components/MarkdownEditor'

    export default {
        //组件名
        name: '',
        //实例的数据对象
        data() {
            return {
                tab: '',
                // TODO tab抽出做个组件
                tabs: [],
                title: '',
                content: '',
                loading: true,
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
            getTabs() {
                ApiService.tab.index().then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.tab = data[0].value;
                        this.tabs = data;
                    } else {
                        alert(message)
                    }
                })
            },
            publish() {
                const query = {
                    user_id: this.userInfo._id,
                    tab: this.tab,
                    title: this.title,
                    content: this.content,
                }
                this.$store.commit('setLoading', {state: true});
                ApiService.topic.create(query).then(res => {
                    this.$store.commit('setLoading', {state: false});
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.$message.success('主题发布成功');
                        this.$router.push({
                            path: '/topic/detail',
                            query: {
                                topic_id: data.topic_id,
                            }
                        })
                    } else {
                        this.$message.error(message);
                    }
                })
            },
        },
        //生命周期函数
        created() {
            this.getTabs();
        },
        beforeMount() {

        },
        mounted() {

        },
        //监视
        watch: {},
        //组件
        components: {
            MarkdownEditor
        },
        //过滤器
        filters: {},
        //自定义指令
        directive: {}
    }
</script>

<style lang="scss" scoped>
    .choose, .title, .editor-container {
        margin-bottom: 20px;
    }
</style>
