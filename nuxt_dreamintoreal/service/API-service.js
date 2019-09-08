import Vue from 'vue';
import Http from '@/plugins/axios';
import API from './API-path';

Http.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8";
Http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});
/**
 * encode get 请求对象
 * @param params
 * @returns {string}
 */
const encodeParams = (params) => {
    let r = '?',
        p = [];
    for (let key in params) {
        p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    }
    return r + p.join('&');
};

/**
 * 请求类
 */
class ApiService {
    constructor() {
        this.user = {
            signin: this.post.bind(this, API.user.signin),
            signup: this.post.bind(this, API.user.signup),
            signout: this.post.bind(this, API.user.signout),
            getUserByToken: this.post.bind(this, API.user.getUserByToken),
            activeAccount: this.post.bind(this, API.user.activeAccount),
            updateAvatar: this.postFile.bind(this,API.user.updateAvatar),
            detail: this.post.bind(this,API.user.detail),
            updateInfo: this.post.bind(this,API.user.updateInfo),
            updatePassword: this.post.bind(this,API.user.updatePassword),
            topUsers: this.post.bind(this,API.user.topUsers),
        }
        this.tab = {
            index: this.post.bind(this, API.tab.index),
        }
        this.message = {
            getList: this.post.bind(this, API.message.getList),
            unreadCount: this.post.bind(this, API.message.unreadCount),
            mark_all: this.post.bind(this, API.message.mark_all),
            mark_one: this.post.bind(this, API.message.mark_one),
        }
        this.topic = {
            create: this.post.bind(this,API.topic.create),
            up: this.post.bind(this,API.topic.up),
            collect: this.post.bind(this,API.topic.collect),
            collectedTopics: this.post.bind(this,API.topic.collectedTopics),
            cancelCollect: this.post.bind(this,API.topic.cancelCollect),
            update: this.post.bind(this,API.topic.update),
            delete: this.post.bind(this,API.topic.delete),
            list: this.post.bind(this,API.topic.list),
            detail: this.post.bind(this,API.topic.detail),
            todayHotTopics: this.post.bind(this,API.topic.todayHotTopics),
        }
        this.comment = {
            add: this.post.bind(this,API.comment.add),
            edit: this.post.bind(this,API.comment.edit),
            up: this.post.bind(this,API.comment.up),
            delete: this.post.bind(this,API.comment.delete),
        }
        this.reply = {
            add: this.post.bind(this,API.reply.add),
            edit: this.post.bind(this,API.reply.edit),
            up: this.post.bind(this,API.reply.up),
            delete: this.post.bind(this,API.reply.delete),
        }
        this.file = {
            upload: this.postFile.bind(this,API.file.upload),
        }
        this.interceptorsOfReq();
        this.interceptorsOfRes();
    }

    /**
     * encode请求参数
     * @param url
     * @param params
     * @returns {Promise.<TResult>}
     */
    getParam(url, params) {
        if (params) {
            url += '?param=' + encodeURIComponent(JSON.stringify(params));
        }
        return Http.get(url).then(res => {
            if (res.statusText == "OK") {
                window.location.href = url
                return {result: 0}
            } else {
                return {result: -1}
            }
        });
    }

    getSignParams(params) {
        let _params;
        const sortParams = keySort(params);
        const str_params = JSON.stringify(sortParams);
        // 获取私钥
        const rsa = KEYUTIL.getKey(CONFIG.privateKey);
        // 创建Signature对象，设置签名编码算法
        const sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
        // 初始化
        sig.init(rsa);
        // 传入待加签字符串
        sig.updateString(str_params);
        // 获取加签后的十六进制字符串
        const hSig = sig.sign();
        _params = {
            msg: str_params,
            // signature: hextob64(hSig),
            signature: hSig,
        }
        return _params;
    }

    /**
     * 新增标签进行下载
     * @param url
     * @param params
     */
    tagDownFile(url, params) {
        let _params = {};
        _params.param = params;
        if (params) {
            url += '?param=' + encodeURIComponent(JSON.stringify(params));
        }
        window.open(url, '_blank');
    }

    /**
     * 下载文件 当前页面下载 可多次调用下载多个文件
     * @param url
     * @param params
     * @returns {Promise.<TResult>}
     */
    downFile(url, params) {
        if (!params) {
            params = {}
        }
        /*return Http.post(url, params).then(res => {
        	// let fileName = res.headers['content-disposition'].split('"')[1];
        	let link = document.createElement('a');
			let blob = new Blob([JSON.stringify(res.data)])
			link.href = URL.createObjectURL(blob);
			// link.download = decodeURI(fileName);
			link.click();
        });*/
        let signedParams = this.getSignParams(params);
        return Http({
            method: 'post',
            url: url,
            data: signedParams,
            responseType: 'blob',     //不加它导致乱码
        }).then(res => {
            if (!res) {
                return {
                    code: -1,
                    msg: '下载失败'
                };
            }
            if (res.data.type == 'application/json') {
                var reader = new FileReader();
                // reader.readAsBinaryString(res.data);
                reader.readAsText(res.data);
                reader.addEventListener("load", function () {
                    var _res = JSON.parse(reader.result);
                    if (_res.code && _res.code != CONFIG.success) {
                        vueVm.$message.error(Vue.t('errMsg.' + _res.code));
                    }
                });
                return {
                    code: -1,
                    msg: '下载失败'
                };
            }
            let url = window.URL.createObjectURL(new Blob([res.data]));
            let link = document.createElement('a');
            link.style.display = '';
            link.href = url;
            let fileName = decodeURIComponent(res.headers['filename']);
            console.log('下载的文件名==' + fileName);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            return {
                code: 0,
                msg: '下载成功'
            }
        })
    }

    /**
     * get请求
     * @param url
     * @param params
     * @returns {Promise.<TResult>}
     */
    get(url, params) {
        if (params) {
            url += encodeParams(params);
        }
        return Http.get(url).then(res => res.data);
    }

    /**
     * post请求
     * @param url       请求地址
     * @param params    请求参数
     * @param flag      是否需要加签名
     * @returns {Promise.<TResult>}
     */
    post(url, params, flag) {
        // 最终传递的参数
        // 需要加签名
        let _params;
        if (flag) {
            if (!params) {
                params = {}
            }
            _params = this.getSignParams(params);
        } else {
            _params = params;
        }

        return Http.post(url, _params).then(res => res.data);
    }

    /**
     * 上传文件
     * @param url
     * @param formData
     * @param config
     * @returns {Promise.<TResult>}
     */
    postFile(url, formData, config) {
        console.log('formData提交数据== ' + formData);
        return Http({
            url: url,
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    }

    /**
     * 上传文件返回进度以及结果
     * @param url
     * @param formData
     * @param callback1     进度对象
     * @param callback2     返回结果
     * @returns {Promise.<TResult>}
     */
    postFilePercent(url, formData, callback1, callback2) {
        return Http({
            url: url,
            method: 'post',
            data: formData,
            onUploadProgress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                    callback1(progressEvent);
                }
            }
        }).then(res => {
            callback2(res.data)
        }).then(err => {
            console.log(err);
        })
    }

    /**
     * 请求拦截器
     * @returns {number}
     */
    interceptorsOfReq() {
        return Http.interceptors.request.use(
            config => {
                console.log('请求URL== ' + config.url);
                console.log('请求参数==', config.data);
                return config;
            },
            err => {
                return Promise.reject(err);
            });
    }

    /**
     * 响应拦截器
     */
    interceptorsOfRes() {
        Http.interceptors.response.use(function (response) {
            console.log('响应完整数据==', response);
            console.log('响应数据==', response.data);
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }

}

//导出一个对象
export default new ApiService();
