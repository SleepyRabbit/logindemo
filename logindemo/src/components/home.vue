<template>
  <div class="home flex">

    <div class="list flex flex-direction-column">
      <h3>Dashboard</h3>
      <div class="flex flex-direction-column overflow-y-auto">
        <router-link to="/home/dashboard"><i class="fa fa-list fa-fw"></i>Dashboard</router-link>
        <!--<router-link to="/home/devcenter"><i class="fa fa-gears fa-fw"></i>Devcenter</router-link>-->
        <router-link to="/home/bar"><i class="fa fa-bar-chart fa-fw"></i>Bar</router-link>
        <router-link to="/home/chart"><i class="fa fa-area-chart fa-fw"></i>Chart</router-link>
        <router-link to="/home/cart"><i class="fa fa-shopping-cart fa-fw"></i>Cart</router-link>
        <a href="#"><i class="fa fa-bar-chart"></i>Dashboard</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>

        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
        <a href="#"><i class="fa fa-address-card"></i>Widgets</a>
      </div>
    </div>

    <router-view class="content box-y overflow-y-auto"></router-view>

  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .home {
  }

  .list {
    position: relative;
    width: 20%;
    border-right: 2px solid rgb(220,220,220);
    background-color: rgb(248,248,248);
    font-weight: 500;
  }

  .list h3 {
    padding: 15px 20px;
    color: blue;
    border-bottom: 2px solid rgb(220,220,220);
  }

  .list a {
    align-items: center;
    width: 100%;
    padding: 14px 0;
    color: rgb(48,165,255);
    /*color: rgb(0,136,204);*/
    cursor: pointer;
    text-decoration: none;
  }

  .list a:hover {
    background-color: rgb(224,224,232);
    box-shadow: 3px 3px 5px rgb(205,210,210);
  }

  .list a:focus {
    background-color: rgb(48,165,255);
    color: white;
  }

  .list i {
    font-size: 14px;
    margin: 0 20px;
  }

  .content {
    /*background-color: rgb(228,231,234);*/
    /*background-color: rgb(238,238,238);*/
  }

</style>
