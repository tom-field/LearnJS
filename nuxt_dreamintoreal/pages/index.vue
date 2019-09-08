<template>
  <div class="home">

    <el-input placeholder="搜索" v-model="keyword" @keyup.enter.native="search">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>

    <el-tag :type="activeTab==item.value?'success':'info'"
            class="pointer"
            v-for="(item,index) in tabs" :key="index"
            @click.native="changeTab(item.value)">
      {{item.label}}
    </el-tag>

    <el-tag :type="activeTab==item.value?'success':'info'"
            class="pointer"
            v-for="(item,index) in testTabs" :key="index"
            @click.native="changeTab(item.value)">
      {{item.label}}
    </el-tag>

    <el-card shadow="always">
      <ul class="list-unstyled">
        <b-media tag="li" class="my-4" v-for="(item,index) in list" :key="index">
          <b-img slot="aside" class="pointer" :src="item.author.avatar" width="40" height="40"
                 alt="placeholder" @click="goUserDetail(item.author.loginname)"/>
          <h6 class="mt-0 mb-1">
            <a href="javascript:;" @click="goTopicDetail(item._id)">{{item.title}}</a>
          </h6>
          <div style="margin-top: 20px;">
            • <span class="source">主题：{{item.tab.label}}</span>
            • <span>作者：<b-link href="javascript:;"
                               @click="goUserDetail(item.author.loginname)">{{item.author.loginname}}</b-link></span>
            • <span>点赞：{{item.ups.length || 0}}</span>
            • <span>收藏：{{item.collect_count || 0}}</span>
            • <span>浏览：{{item.visit_count || 0}}</span>
            • <span>评论：{{item.comment_count || 0}}</span>
          </div>
          <hr>
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
  import {mapGetters} from 'vuex';

  export default {
    //组件名
    name: '',
    //实例的数据对象
    data() {
      return {
        keyword: '',
        activeTab: 'all',
        pager: {
          pageSize: 10,
          pageNo: 1,
          totalCount: 0,
        },
        tabs: [],
        list: [],
      }
    },
    asyncData(context){
      return ApiService.tab.index().then(res => {
        const {code, data, message} = res;
        if (code == 0) {
          data.unshift({
            label: "所有",
            value: "all",
          })
          const testTabs = data;
          return {
            testTabs: testTabs,
          }
        }
      }).catch(err=>{
        console.log(err.message);
        context.error({ message: 'Not Found', statusCode: 404 })
      })
    },
    //数组或对象，用于接收来自父组件的数据
    props: {},
    //计算
    computed: {
      ...mapGetters({'userInfo': 'getUserInfo'}),
    },
    //方法
    methods: {
      search() {
        this.getList();
      },
      changeTab(val) {
        this.activeTab = val;
        this.getList();
      },
      getList() {
        const query = {
          tab: this.activeTab,
          keyword: this.keyword,
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
      handleClick() {
        this.getList();
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
      const token = this.$route.query.token;
      if (token) {
        //用token获取用户信息
        const query = {
          token: token,
        }
        ApiService.user.getUserByToken(query).then(res => {
          const {code, data, message} = res;
          if (code == 0) {
            localStorage.setItem("token", data.accessToken);
            this.$store.commit('setUserInfo', data);
            //获取未读消息
            const query = {
              user_id: this.userInfo._id,
            }
            ApiService.message.unreadCount(query).then(res => {
              const {code, data, message} = res;
              if (code == 0) {
                this.$store.commit('setUnreadMessage', data);
              } else {
                this.$message.error(message);
              }
            })
          } else {
            this.$message.error(message);
            this.$store.commit('clearUserInfo');
          }
        })
      }
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
  .media {
    margin-bottom: 10px;
  }

  .el-tag {
    margin: 10px 10px 10px 0;
  }
</style>
