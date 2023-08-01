<template>
    <div>
      <TopPage/>
      <button @click="test">1111</button>
    </div>
  </template>
  
  <script>
import TopPage from '../../components/zhuye/YeMian/TopPage.vue'
  export default {
      name:'YeMian',
      data() {
          return {
              
          }
      },
      methods:{
        test(){
          console.log(this.$store.state.avaterImg)
        }
      },
      components:{
          TopPage,
      },
  }
  </script>
  
  <style>
  
  </style>