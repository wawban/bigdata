import axios from 'axios';
import { Message } from 'element-ui'
import {
  showLoading,
  hideLoading
} from "./loading"
var xy = window.location.protocol;
var zj = window.location.host;
var baseUrl = xy + '//' + zj;
// const baseUrl = 'http://47.122.38.213:8888';
// const baseUrl = 'http://129.28.151.167:8888';
var service = axios.create({
  onUploadProgress: (progressEvent) => { },
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
});
service.interceptors.request.use(
  config => {
    if (config.loading != false) {
      showLoading()
    }
    var url = window.location.href.split("?")[1]
    var kv = url.split("&")
    if (!sessionStorage.getItem('newtoken')) {
      sessionStorage.setItem("newtoken", kv[3].split("=")[1])
    }
    config.headers['DecryptRequestBody'] = 0;
    config.headers['accessKeyId'] = 'XoyNoHs1';
    config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('newtoken');
    return config;
  },
  error => {
    hideLoading();
    return Promise.reject(error);
  });
service.interceptors.response.use(
  response => {
    hideLoading();
    const dataAxios = response.data;
    const { code } = dataAxios;
    if (code === undefined) {
      return dataAxios;
    } else {
      return dataAxios.data;
    }
  },
  error => {
    hideLoading();
    if (error.response) {
      Message({
        message: error.response.data.errorCode + ' - ' + error.response.data.errorMessage,
        type: 'error',
      });
      return Promise.reject(error.response.data);
    } else {
      Message({
        message: error.errorCode + ' - ' + error.errorMessage,
        type: 'error',
      });
      return Promise.reject(error);
    }
  }
);
export default service;