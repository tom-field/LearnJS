import Http from 'axios'
import API from './API-path';

Http.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8";

Http.interceptors.response.use(function (response) {
  if (response.data.result == 1 || response.data.code == 1) {
    window.location.href = API.Base + "/login";
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

const encodeParams = (params) => {
  let r = '?',
    p = [];
  for (let key in params) {
    p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  }
  return r + p.join('&');
};

// 请求类
class ApiService{
  constructor(){
    this.cityGuess = this.get.bind(this,API.cityGuess);
    this.interceptorsOfReq();
    this.interceptorsOfRes();
  }
  get(url, params) {
    if (params) {
      url += encodeParams(params);
    }
    return Http.get(url).then(res => res.data);
  }

  post(url, params) {
    if (!params) {
      params = {}
    }
    return Http.post(url, params).then(res => res.data);
  }

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

  interceptorsOfRes() {
    Http.interceptors.response.use(function (response) {
      console.log('响应数据', response.data);
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }
}
