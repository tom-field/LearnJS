<template>
  <div class="signin">
    <el-card shadow="always">
      <el-form :model="formData" status-icon :rules="formRules" ref="formData">
        <el-form-item prop="loginName">
          <el-input v-model="formData.loginName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" @keyup.enter.native="submitForm('formData')">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="formData.remember">自动登录</el-checkbox>
          <el-button type="text" @click="handleForget">忘记密码</el-button>
        </el-form-item>
        <!--<el-form-item label="其他登录">
            <el-button plain>
                <a href="https://github.com/login/oauth/authorize?client_id=2077f6a3dabfbf142af0">
                    <img src="https://assets.gitlab-static.net/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png" alt="">
                    搜索
                </a>
            </el-button>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submitForm('formData')">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="d-flex justify-content-between flex-wrap">
            <a :href="githubAuthURL">
              <el-button><img
                src="https://assets.gitlab-static.net/assets/auth_buttons/github_64-84041cd0ea392220da96f0fb9b9473c08485c4924b98c776be1bd33b0daab8c0.png"
                alt="">GitHub
              </el-button>
            </a>
            <a :href="googleAuthURL">
              <el-button><img
                src="https://assets.gitlab-static.net/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png"
                alt="">
                <span>Google</span>
              </el-button>
            </a>
            <el-button type="text" @click="$router.push('/sign/signup')">注册帐号</el-button>
          </div>
        </el-form-item>
      </el-form>
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
        githubAuthURL: '/api/' + process.env.API_PREFIX + '/passport/github',
        googleAuthURL: '/api/' + process.env.API_PREFIX + '/passport/google',
        formData: {
          loginName: '',
          password: '',
          remember: false,
        },
        formRules: {
          loginName: [
            {
              required: true,
              validator: (rule, val, callback) => {
                if (!val) {
                  return callback(new Error('姓名不能为空'));
                } else {
                  return callback();
                }
              },
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              validator: (rule, val, callback) => {
                if (!val) {
                  return callback(new Error('密码不能为空'));
                } else {
                  return callback();
                }
              },
              trigger: 'blur'
            }
          ],
        },
      }
    },
    //数组或对象，用于接收来自父组件的数据
    props: {},
    //计算
    computed: {},
    //方法
    methods: {
      handleForget() {

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const query = {
              loginname: this.formData.loginName,
              pass: this.formData.password,
            }
            ApiService.user.signin(query).then(res => {
              const {code, data, message} = res;
              if (code == 0) {
                this.$store.commit('setUserInfo', data);
                this.$message.success('登录成功');
                this.$router.push({
                  path: '/',
                  query: {
                    token: data.accessToken,
                  }
                });
              } else {
                this.$message.error(message);
              }
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
  .signin {
    width: 450px;
    margin: 100px auto;
  }

  .other-login {

  }

  img {
    width: 18px;
    height: 18px;
    margin-right: 16px;
  }
</style>
