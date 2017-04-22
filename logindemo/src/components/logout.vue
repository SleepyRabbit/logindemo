<template>
  <div class="logout">
    <button @click="onLogout" class="btn btn-primary">Logout</button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import ds from '../deepstream/ds'

export default {
  name: 'logout',
  methods: {
    ...mapActions([
      'changeLoginState'
    ]),
    onLogout: function () {
      sessionStorage.removeItem('user');
      this.changeLoginState(false);
      this.$router.replace('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button {
    background-color: rgb(85,170,85);
  }
</style>
