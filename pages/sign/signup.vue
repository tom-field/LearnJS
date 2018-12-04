<template>
    <div class="signup">
        <el-card shadow="always">
            <el-form :model="formData" status-icon :rules="formRules" ref="formData" label-width="">
                <el-form-item prop="loginName" label="">
                    <el-input v-model="formData.loginName" placeholder="请输入用户名:"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="">
                    <el-input v-model="formData.email" placeholder="请输入邮箱:"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="" @keyup.enter.native="submitForm('formData')">
                    <el-input type="password" v-model="formData.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword" label="" @keyup.enter.native="submitForm('formData')">
                    <el-input type="password" v-model="formData.rePassword" placeholder="再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="submitForm('formData')">注册</el-button>
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
                        <el-button type="text" @click="$router.push('/sign/signin')">直接登录</el-button>
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
                githubAuthURL: process.env.AUTH_ROOT+ process.env.API_PREFIX + '/passport/github',
                googleAuthURL: process.env.AUTH_ROOT+ process.env.API_PREFIX + '/passport/google',
                formData: {
                    loginName: '',
                    email: '',
                    password: '',
                    rePassword: '',
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
                    email: [
                        {
                            required: true,
                            validator: (rule, val, callback) => {
                                if (!val) {
                                    return callback(new Error('邮箱不能为空'));
                                } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(val)) {
                                    return callback(new Error('邮箱格式不正确'));
                                }
                                else {
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
                    rePassword: [
                        {
                            required: true,
                            validator: (rule, val, callback) => {
                                if (!val) {
                                    return callback(new Error('密码不能为空'));
                                } else if (val != this.formData.password) {
                                    return callback(new Error('两次密码输入不一致'))
                                } else {
                                    return callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {},
        //方法
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const query = {
                            loginname: this.formData.loginName,
                            email: this.formData.email,
                            pass: this.formData.password,
                            rePass: this.formData.rePassword,
                        }
                        ApiService.user.signup(query).then(res => {
                            const {code, data, message} = res;
                            if (code == 0) {
                                this.$message.success('注册成功,点击邮件中的链接进行账号激活!');
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
    .signup{
        width: 450px;
        margin: 100px auto;
    }
    img {
        width: 18px;
        height: 18px;
        margin-right: 16px;
    }
</style>
