<template>
<div>{{subpage}}</div>
</template>

<script>
  //import  from ''

  export default {
    //组件名
    name: '',
    //实例的数据对象
    data() {
      return {
        subpage:'page1/subpage'
      }
    },
    //数组或对象，用于接收来自父组件的数据
    props: {},
    //计算
    computed: {},
    //方法
    methods: {},
    //生命周期函数
    created() {
      this.showpage = true;
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

<style>

</style>
