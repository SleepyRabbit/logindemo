<template>
  <div id="app">

    <router-link to="/login" v-if="!getLoginState"></router-link>

    <div v-if="getLoginState">
      <div class="site-header">
        <router-link to="/home"><i class="fa fa-bars"></i></router-link>
        <router-link to="/home"><i class="fa fa-home"></i>Home</router-link>
        <router-link to="/like"><i class="fa fa-podcast"></i>Like</router-link>
        <router-link to="/hate"><i class="fa fa-envelope-o"></i>Hate</router-link>
        <router-link to="/logout"><i class="fa fa-user"></i>Logout</router-link>
      </div>
    </div>

    <router-view :class="{'view-field': getLoginState }"></router-view>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'getLoginState'
    ])
  },
}
</script>

<style scoped>
  #app {
    width: 100%;
    height: 100%;
  }

  .site-header {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: rgb(34,34,34);
    z-index: 1000;
  }

  .view-field {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 60px;
    z-index: 0;
  }

  .site-header a {
    float: left;
    height: 100%;
    position: relative;
    padding: 20px 15px;
    font-size: 16px;
    /*color: rgb(210,210,210);*/
    color: rgb(220,220,220);
  }

  .site-header a:first-child {
    font-size: 24px;
    padding: 15px;
  }

  .site-header a:last-child {
    float: right;
  }

  .site-header a:hover{
    color: white;
  }

  .site-header a:link{
    text-decoration: none;
  }

  .site-header i {
    padding: 0 10px;
  }
</style>
