<template>

  <div class="login">

    <div class="login-container centered">
      <div class="account-container">

        <h1>登录</h1>
        <h5>请登录您的账号：</h5>

        <input type="text" v-model="username" placeholder="User" class="user-field input-field">
        <input type="password" v-model="password" placeholder="Password" class="password-field input-field">

        <div class="check-field">
          <input type="checkbox" class="check-box" id="check-box"><label class="label-field" for="check-box">Remember me</label>
        </div>

        <button @click="onLogin" class="btn btn-primary">Login</button>

        <div>
          <a href="" class="register-field">Register</a>
          <a href="" class="forget-field">Forget password</a>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import {mapActions} from 'vuex'
  import ds from '../deepstream/ds'

  export default {
    name: 'login',
    data() {
      return {
//        username: 'dashboard ',
//        password: 'ewHrlx74hye',
        username: 'ws_d1',
        password: 'thisisatestkey',
//        username: '',
//        password: '',
      }
    },
    methods: {
      ...mapActions([
        'changeLoginState',
      ]),
      onLogin: function () {
        var user = {
          username: this.username,
          password: this.password,
        };
//        console.log('onLogin!');
        ds.login(user, (success, data) => {
          if(success === true) {
            sessionStorage.setItem('user', JSON.stringify(user));
            this.changeLoginState(true);
            this.$router.replace('/');
          }
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    color: #838383;
    font: 13px/1.7em 'Open Sans';
    background: url('../assets/img/login/login-bg.png');
    /*background-size: 100% 100%;*/
  }

  .login-container {
    width: 380px;
    /*display: block;*/
    background: rgb(249,249,249);
    border: 1px solid #d5d5d5;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }

  .centered {
    position: relative;
    left: calc(50% - 190px);
    top: 20%;
  }

  .account-container {
    display: block;
    margin: 20px 30px 20px 30px;
  }

  h1 {
    color: black;
    font-size: 35px;
  }

  h5 {
    padding: 20px 0;
  }

  .user-field {
    background: url('../assets/img/login/user.png')  no-repeat;
  }

  .password-field {
    background: url('../assets/img/login/password.png')  no-repeat;
  }

  .input-field {
    position: relative;
    width: 100%;
    height: 40px;
    padding-left: 45px;
    margin-bottom: 15px;
    font-size: 14px;
    border: 1px solid rgb(204,204,204);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .check-field {
    display: block;
    width: 100%;
    height: 20px;
    margin-bottom: 20px;
    /*background-color: green;*/
  }

  .check-box {
    vertical-align: middle;
    cursor: pointer;
    /*padding: 2px;*/
  }

  .label-field{
    padding-left: 10px;
    font-size: 14px;
    cursor: pointer;
    vertical-align: middle;
  }

  button {
    width: 100%;
    min-height: 30px;
    margin-bottom: 20px;
    background-color: rgb(85,172,238);
    border: 0;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
  }

  button:hover {
    background-color: rgb(39,149,233);
    cursor: pointer;
  }

  input:focus {
    box-shadow: 1px 1px 6px #c0a16b
  }

  input, button:focus {
    outline: none;
  }

  a {
    font-size: 14px;
    color: green;
  }

  a:link {
    text-decoration: none;
  }

  .forget-field {
    float: right;
  }
</style>
