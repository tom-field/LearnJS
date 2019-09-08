import Vue from 'vue';
import moment from 'moment';

export function trim(str) {
  return str.replace(/(^\s*)(\s*$)/g, '')
}

export function dateTime(str) {
  return moment(str).format('YYYY年MM月DD日 HH:mm:ss')
}

export function tab(str) {
  switch (str) {
    case 'share':
      return '分享';
    case 'ask':
      return '问答';
    case 'math':
      return '数学';
    default:
      return '';
  }
}

const filters = {
  trim,
  dateTime,
  tab,
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters;


