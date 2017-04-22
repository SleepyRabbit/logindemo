<template>
  <div class="rpc_modal">

    <!-- container start -->

      <div class="box flex flex-direction-column">

        <div class="container-header flex-grow-0">
          <div class="box flex flex-justify-content-space-between flex-align-items-center">
            <h4><i class="fa fa-cog"></i><strong>RPC Configuration</strong></h4>
            <i class="fa fa-times close close1" @click="onClose"></i>
          </div>
        </div>

        <div class="container-content flex-grow-1">
          <div class="container-content-box flex flex-direction-column flex-justify-content-space-around">

              <div class="content-method flex">
                <label>Prompt: </label>
                <select name="" id="" class="flex-grow-1" v-model="rpc_selected" @change="onSelect">
                  <option v-for="rpc in rpcs">{{ rpc }}</option>
                </select>
              </div>

              <div class="content-method flex">
                <label>Method: </label>
                <input class="flex-grow-1" type="text" v-model="closure.R.method">
              </div>

              <div class="content-url flex">
                <label>Url: </label>
                <input class="flex-grow-1" type="text" v-model="closure.R.url">
              </div>

              <div class="content-params flex">
                <label>Params: </label>
                <input class="flex-grow-1" type="text" v-model="closure.R.params">
              </div>

              <div class="content-id flex">
                <label>Id: </label>
                <input class="flex-grow-1" type="text" @keydown="onidkeydown()" v-model="id" disabled="disabled">
              </div>

              <div class="content-closure-D flex">
                <label>D: </label>
                <input class="flex-grow-1" type="text" v-model="dev" disabled="disabled">
              </div>

            <!--<div class="content-methods flex">-->
            <!--<label>Methods: </label>-->
            <!--<input class="flex-grow-1" type="text" v-model="rpc.methods">-->
            <!--</div>-->

            <!--<div class="content-url flex">-->
            <!--<label>Url: </label>-->
            <!--<input class="flex-grow-1" type="text" v-model="rpc.url">-->
            <!--</div>-->

          </div>
        </div>

        <div class="container-footer flex-grow-0">
          <div class="box flex flex-direction-row flex-justify-content-center">
            <button @click="onClose" class="primary no-border"><i class="fa fa-close"></i>Cancel</button>
            <button @click="onConfirm" class="primary no-border"><i class="fa fa-check"></i>Confirm</button>
          </div>
        </div>
      </div>

    <!-- container end -->

  </div>
</template>

<script>
import ds from '../../../deepstream/ds'

export default {
  name: 'rpc_modal',
  data() {
    return {
      rpcs: ['Rtmpc.push', 'Rtmpc.stop', 'uCast.info'],
      rpc_selected: 'Rtmpc.push',
//      method: 'Rtmpc.push',
//      url: 'ucast.cc:6020',
//      params: {},
//      id: '12345',
      closure: {
        D: Number,
        R: {
          method: "Rtmpc.push",
          url: 'ucast.cc:6020',
          params: {},
          id: 12345,
        }
      },
    }
  },
  props: {
    dev: Number,
    id: Number,
  },
  methods: {
    onSelect: function () {
      if (this.rpc_selected === 'Rtmpc.push') {
          this.closure.R = {
            method: "Rtmpc.push",
            url: "rtmp://video-center.alivecdn.com/AppName/StreamName?vhost=live.ucast.cc",
            params: {},
            id: 12344,
          }
      }
      else if (this.rpc_selected === 'Rtmpc.stop') {
        this.closure.R = {
          method: "Rtmpc.stop",
          url: "",
          params: {},
          id: 12343,
        }
      }
      else if (this.rpc_selected === 'uCast.info') {
        this.closure.R = {
          method: "uCast.info",
          url: "",
          params: {},
          id: 234567,
        }
      }
      else {

      }
    },
    onidkeydown: function () {
      //做出限制，在id输入框内键入数字、backspack、方向键有效。
      if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)||(event.keyCode>=37&&event.keyCode<=40)||(event.keyCode===8))) {
        event.returnValue=false;
      }
    },
    onClose: function () {
      this.$emit('close');
    },
    onConfirm: function () {
      this.closure.D = this.dev;
      this.closure.R.id = parseInt(this.id);
      this.$emit('confirm', this.closure);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .rpc_modal {
    display: block;
    position: fixed;
    width: 350px;
    height: 270px;
    left: 35%;
    top: 30%;
    border: 1px solid rgb(204,204,204);
    z-index: 9999;
  }

  .container-header {
    height: 36px;
    font-size: 14px;
    border-bottom: 1px solid rgb(166,166,166);
    background: -webkit-linear-gradient(bottom, #dddddd,  #fafafa);
    background: -o-linear-gradient(top, #dddddd,  #fafafa);
    background: -moz-linear-gradient(top, #dddddd,  #fafafa);
    background: linear-gradient(to top, #dddddd,  #fafafa);
  }

  .close {
    font-size: 16px;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 5px;
   }

  .container-header h4,i {
    padding: 0 5px;
  }

  .container-content {
    height: 50%;
    background-color: white;
  }

  .container-content-box {
    width: 84%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 0 30px 0;
  }


  label {
    width: 70px;
  }

  input {
    padding-left: 5px;
  }

  input:focus {
    outline: none;
  }

  select {
    padding-left: 5px;
  }

  select:focus {
    outline: none;
  }

  .content-method {
    height: 20px;
  }

  .content-url {
    height: 20px;
  }

  .content-params {
    height: 20px;
  }

  .content-id {
    height: 20px;
  }

  .content-closure-D {
    height: 20px;
  }

  .container-footer {
    height: 40px;
    /*border-top: 1px solid rgb(166,166,166);*/
    background-color: white;
    padding-bottom: 10px;
  }

  .container-footer input {
    width: 50%;
    height: 100%;
    padding-left: 10px;
  }

</style>
