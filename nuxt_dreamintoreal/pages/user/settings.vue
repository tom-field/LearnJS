<template>
    <div class="user_settings">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <el-button type="text"><label for="file">更新头像:</label></el-button>
            </div>
            <label for="file">
                <img style="height: 60px;width: 60px;" :src="userInfo.avatar">
            </label>
            <input type="file" accept="image/jpeg" class="hide" id="file" @change="handleUpload()">
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <el-button type="text">修改个人信息:</el-button>
            </div>
            <el-form :model="infoForm" status-icon :rules="infoFormRules" ref="infoForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="个人网站" prop="url">
                    <el-input v-model="infoForm.url"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="location">
                    <el-input v-model="infoForm.location"></el-input>
                </el-form-item>
                <el-form-item label="签名" prop="signature">
                    <el-input v-model.number="infoForm.signature"></el-input>
                </el-form-item>
                <el-form-item label="微博账号" prop="weibo">
                    <el-input v-model.number="infoForm.weibo"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleUpdateInfo('infoForm')">保存设置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <el-button type="text">修改密码:</el-button>
            </div>
            <el-form :model="passwdForm" status-icon :rules="passwdFormRules" ref="infoForm" label-width="120px"
                     class="demo-ruleForm">
                <el-form-item label="原密码" prop="url">
                    <el-input type="password" v-model="passwdForm.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="location">
                    <el-input type="password" v-model="passwdForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="再次输入新密码" prop="location">
                    <el-input type="password" v-model="passwdForm.renewPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleUpdatePasswd('passwdForm')">提交</el-button>
                </el-form-item>
            </el-form>
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
                infoForm: {
                    url: '',
                    location: '',
                    weibo: '',
                    signature: ''
                },
                passwdForm: {
                    password: '',
                    newPassword: '',
                    renewPassword: '',
                },
                infoFormRules: {},
                passwdFormRules: {},
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
            handleUpload() {
                let _this = this;
                const file = document.getElementById('file').files[0];
                const userInfo = _this.userInfo;
                const avatar = userInfo.avatar.split('.com/')[1] || '';
                //开始上传 返回成功后展示
                let fd = new FormData();
                fd.append('user_id', userInfo._id);
                fd.append('avatar', avatar);
                fd.append('file', file);
                ApiService.user.updateAvatar(fd).then(res => {
                    const {code, data, message} = res;
                    if (code == 0) {
                        const userInfo = JSON.parse(JSON.stringify(this.userInfo));
                        userInfo.avatar = data.url;
                        _this.$store.commit('setUserInfo', userInfo);
                        this.$message.success('头像更新成功!');
                    } else {
                        _this.$message.error(message);
                    }
                })
            },
            getUserInfo() {
                this.infoForm = this.userInfo;
            },
            handleUpdateInfo(formName) {
                let query = this.infoForm;
                query.user_id = this.userInfo._id;
                ApiService.user.updateInfo(query).then(res => {
                    let {code, data, message} = res;
                    if (code == 0) {
                        this.$message.success('用户信息更新成功!');
                        this.$store.commit('setUserInfo',this.infoForm);
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleUpdatePasswd(formName) {
                let query = this.passwdForm;
                query.user_id = this.userInfo._id;
                ApiService.user.updatePassword(query).then(res => {
                    let {code, data, message} = res;
                    if (code == 0) {
                        this.$message.success('密码更新成功!');
                    } else {
                        this.$message.error(message);

                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        //生命周期函数
        created() {

        },
        beforeMount() {

        },
        mounted() {
            this.getUserInfo();
        },
        //监视
        watch: {},
        //组件
        components: {},
        //过滤器
        filters: {},
        //自定义指令
        directive: {}
    };
</script>

<style lang="scss" scoped>

</style>
