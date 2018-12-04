<template>
    <div class="topic_update">
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
                <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :z-index="20"/>
            </div>
            <el-button type="primary" @click="updateTopic">更新</el-button>
        </el-card>
    </div>
</template>

<script>
    //import  from ''
    import ApiService from '@/service/API-service';
    import {mapGetters} from 'vuex';
    import MarkdownEditor from '@/components/MarkdownEditor'

    export default {
        //组件名
        name: '',
        //实例的数据对象
        data() {
            return {
                topic_id: this.$route.query.topic_id,
                tab: '',
                tabs: [],
                title: '',
                content: '',
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
                        this.tabs = data;
                    } else {
                        alert(message);
                    }
                })
            },
            getDetail() {
                const query = {
                    topic_id: this.topic_id
                }
                ApiService.topic.detail(query).then(res => {
                    const {code, data, message} = res;
                    this.tab = data.topic.tab;
                    this.title = data.topic.title;
                    this.content = data.topic.content;
                })
            },
            updateTopic() {
                const query = {
                    user_id: this.userInfo._id,
                    topic_id: this.topic_id,
                    tab: this.tab,
                    title: this.title,
                    content: this.content,
                }
                ApiService.topic.update(query).then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        this.$message.success('主题更新成功');
                        this.$router.push({
                            path: '/topic/detail',
                            query: {
                                topic_id: this.topic_id,
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
