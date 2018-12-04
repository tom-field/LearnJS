<template>
  <div class="main">
    <top-header></top-header>
    <div class="common-body">
      <div class="common-body-left">
        <nuxt/>
      </div>
      <div class="common-body-right">
        <side-bar></side-bar>
      </div>
    </div>

    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  //import  from ''
  import ApiService from '@/service/API-service';
  import topHeader from '@/components/top-header/top-header';
  import bottomFooter from '@/components/bottom-footer/bottom-footer';
  import sideBar from '@/components/side-bar/side-bar';

  export default {
    //组件名
    name: '',
    //组件
    components: {
      topHeader,
      bottomFooter,
      sideBar,
    },
    //实例的数据对象
    data() {
      return {}
    },
    //数组或对象，用于接收来自父组件的数据
    props: {},
    //计算
    computed: {},
    //方法
    methods: {

    },
    //生命周期函数
    created() {

    },
    beforeMount() {

    },
    mounted() {

    },
    beforeRouterchange(){

    },
    //监视
    watch: {},
    //过滤器
    filters: {},
    //自定义指令
    directive: {}
  }
</script>

<style lang="scss" scoped>

</style>
