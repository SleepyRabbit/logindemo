<template>
  <div class="devcenter box flex">

    <!-- device list area start -->
    <div class="dev_list">
      <div class="dev_list_content flex flex-direction-column">
        <h3>Device List:</h3>
        <div class="flex flex-direction-column overflow-y-auto" v-for="(val, num) in getDevices">
          <i @click="onDevice(num, val)" :class="{ 'sel' : num === getActiveNum }">{{val.id}}</i>
        </div>
      </div>
    </div>
    <!-- device list end -->

    <!-- device data area start-->
    <div class="dev_data flex flex-direction-column overflow-y-auto">

      <!-- device data content, rpc,subscribe and list start -->
      <div class="box dev_data_content flex flex-grow-1">

        <!-- device data content control area, rpc,subscribe start -->
        <div class="dev_data_content_left flex flex-direction-column flex-justify-content-space-around">

          <!-- Rpc Controller -->
          <!-- container start -->
          <div class="container flex-align-self-center">
            <div class="box flex flex-direction-column">
              <div class="container-header flex-grow-0">
                <h4><strong>Rpc Controller</strong></h4>
              </div>

              <!--<label class="flex-grow-1 no-outline no-border">{{rpc_message}}</label>-->
              <div class="container-content flex-grow-1">
                <label class=" no-outline no-border">{{rpc_message}}</label>
              </div>

              <div class="container-footer flex-grow-0">
                <div class="box flex flex-direction-row">
                  <button @click="onShowModal" class="primary no-border no-margin"><i class="fa fa-cog"></i>RPC</button>
                  <input type="text" class="no-border no-outline flex-grow-1" placeholder="Please input rpc instruction..." v-model="msg">
                  <button @click="onRpc" class="primary no-border no-margin"><i class="fa fa-binoculars"></i>Send</button>
                </div>
              </div>
            </div>
          </div>
          <!-- container end -->

          <!-- Subscription Controller -->
          <!-- container start -->
          <div class="container flex-align-self-center">
            <div class="box flex flex-direction-column">
              <div class="container-header flex-grow-0">
                <p><strong>Subscription Controller</strong></p>
              </div>

              <div class="container-content flex-grow-1">
                  <label class=" no-outline no-border">{{subscription_message}}</label>
              </div>

              <div class="container-footer flex-grow-0">
                <div class="box flex flex-direction-row flex-justify-content-center">
                  <button @click="onSubscribe" class="primary no-border"><i class="fa fa-tags"></i>Subscribe</button>
                  <button @click="onUnsubscribe" class="primary no-border"><i class="fa fa-unlink"></i>Unsubscribe</button>
                </div>
              </div>
            </div>
          </div>
          <!-- container end -->

        </div>
        <!-- device data content control area, rpc,subscribe end -->

        <!-- device data content control list area start -->
        <div class="dev_data_content_right flex flex-direction-column flex-justify-content-space-around">

          <!-- Health Chart -->
          <!-- chart area start -->
          <div class="container flex-align-self-center">
            <div class="box flex flex-direction-column">
              <div class="container-header flex-grow-0">
                <h4><strong>Health Chart</strong></h4>
              </div>
              <div class="container-content flex-grow-1">
                <div id="healthchart" class="box">

                </div>
              </div>
            </div>
          </div>
          <!-- chart area end -->

          <!-- Health Chart -->
          <!-- List start -->
          <div class="container flex-align-self-center">
            <div class="box flex flex-direction-column">
              <div class="container-header flex-grow-0">
                <h4><strong>List</strong></h4>
              </div>

              <div class="container-content flex-grow-1">
                <div class="parm-list box">
                  <div class="box overflow-y-auto">
                    <ul class="flex flex-direction-column" v-for="(val, index) in dev_message.data">
                      <li>{{index}} : {{val}}</li>
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                      <!--<li>ssss</li>-->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- List end -->

        </div>
        <!-- device data content control list area end -->
      </div>
      <!-- device data content, rpc,subscribe and list end -->

      <!-- rpc modal area start -->
      <rpc_modal v-if="show_modal" @confirm="onConfirmRpcModal" @close="onCloseRpcModal"></rpc_modal>
      <!-- rpc modal area end -->

      <!-- device data footer area start -->
      <div class="dev_data_footer">
        <p>{{ dev_message }}</p>
      </div>
      <!-- device data footer area end -->
    </div>
    <!-- device data area end -->

  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import ds from '../../deepstream/ds';
  import rpc_modal from './modal/rpc_modal.vue';
  import echarts from 'echarts';
  import { lineOption } from '../../assets/echarts/option'

  var dataNum = 100;

  export default {
  name: 'devcenter',
  components: {
    rpc_modal,
  },
  data: function () {
    return {
      health_x_data: [dataNum],
      health_y_data: [dataNum],
      healthChart: null,
      show_modal: false,
      subscription_message: 'Subscription message display area.',
      rpc_message: 'PRC message display area.',
      dev_message: 'Device Message.',
      msg: '',
    }
  },
  methods: {
    ...mapActions([
      'setActiveNum',
    ]),
    onShowModal: function () {
      this.show_modal = true;
    },
    onCloseRpcModal: function () {
      this.show_modal = false;
    },
    onConfirmRpcModal: function(data)  {
      this.show_modal = false;
      console.log(data);
    },
    onRpc: function () {
      ds.sendRpc((err, ret) => {
        if(!err) {
          this.rpc_message = JSON.stringify(ret);
        }
        else {
          this.rpc_message = "RPC error!"
        }
        console.log(err);
        console.log(ret);
      });
    },
    initSubscription: function () {
      if(this.getActiveDev !== null) {
        console.log(this.getActiveId);
        ds.subscribe(this.getActiveId, (value) => {
          this.dev_message = value;
          this.updateChart(value);
        });
      }
    },
    onSubscribe: function () {
      this.subscription_message = "subscription!";
      ds.subscribe((value) => {
        this.subscription_message = value;
        console.log(value);
      });
    },
    onUnsubscribe: function () {
      this.subscription_message = 'Subscription message display area';
      ds.unsubscribe();
    },
    onDevice: function (num, dev) {
      if(this.getActiveDev !== null) {
        ds.unsubscribe(this.getActiveId);    // Unsubscribe active device
      }
      console.log(dev);
      this.setActiveNum(num);
      this.initChart();
      ds.subscribe(dev.id, (value) => {
        this.dev_message = value;
        this.updateChart(value);
      });
    },
    initChart: function () {
      this.healthChart = echarts.init(document.getElementById('healthchart'), 'vintage');
      for(let i = 0; i<dataNum; i++) {
        this.health_x_data[i] = 0;
        this.health_y_data[i] = i;
      }
      lineOption.xAxis.data = this.health_x_data;
      lineOption.series[0].data = this.health_y_data;
      this.healthChart.setOption(lineOption);
    },
    updateChart: function (data) {
      this.health_x_data.shift();
      this.health_x_data.push(data.time);
      this.health_y_data.shift();
      this.health_y_data.push(data.data.value);
      lineOption.xAxis.data = this.health_x_data;
      lineOption.series[0].data = this.health_y_data;
      this.healthChart.setOption(lineOption);
    },
    init: function () {
      this.initChart();
      this.initSubscription();
      this.dev_message = 'Device message.';
      this.subscription_message = 'Subscription message display area.';
      this.rpc_message = 'PRC message display area.';
    }
  },
  computed: {
    ...mapGetters([
       'getDevices',
       'getActiveNum',
       'getActiveDev',
       'getActiveId',
    ]),
  },
  created: function () {
//    window.onload = this.initChart;
    this.$nextTick(this.init, 100);
  },
  beforeDestroy: function () {
    if(this.getActiveDev !== null) {
        console.log(this.getActiveId)
      ds.unsubscribe(this.getActiveId);    // Unsubscribe active device
    }
    console.log("beforeDestroy!");
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .devcenter {
  }

  /* device list */
  .dev_list {
    width: 15%;
    height: 100%;
    padding: 15px 5px;
    border-right: 1px solid rgb(205,210,210);
  }

  .dev_list_content {
    background: white;
    border-radius: 4px;
  }

  .dev_list h3 {
    padding: 14px 0 14px 10px;
  }

  .dev_list i {
    font-size: 14px;
    color: rgb(48,165,255);
    cursor: pointer;
    text-decoration: none;
    padding: 10px 0 10px 10px;
    width: 100%;
    border-top: 1px solid #c6d9fd;
  }

  .dev_list i:hover {
    color: white;
    background-color: rgb(66,187,248);
    box-shadow: 3px 3px 5px rgb(205,210,210);
  }

  .dev_list .sel {
    color: white;
    background-color: rgb(66,187,248);
    box-shadow: 3px 3px 5px rgb(205,210,210);
  }
  /* device list */

  /* device data */
  .dev_data {
    width: 85%;
    height: 100%;
  }

  /* device data content */
  .dev_data_content {
    width: 100%;
    /*min-height: 580px;*/
  }

  .dev_data_content_left {
    position: relative;
    width: 50%;
    height: 100%;
    /*padding-top: 15px;*/
    border-right: 1px solid rgb(205,210,210);
  }

  .dev_data_content_right {
    position: relative;
    width: 50%;
    height: 100%;
    /*padding-top: 15px;*/
    border-right: 1px solid rgb(205,210,210);
  }
  /* device data content */

  /* device data footer */
  .dev_data_footer {
    width: 100%;
    height: 100px;
    padding: 8px;
    font-size: 14px;
    background-color: white;
    border-top: 1px solid rgb(205,210,210);
  }
  /* device data footer */

  /* device data */

  /* container */
  .container {
    position: relative;
    width: 90%;
    height: 44%;
    border: 1px solid rgb(204,204,204);
    /*margin-bottom: 20px;*/
    background-color: white;
    /*min-height: 240px;*/
  }

  .container .container-header {
    padding: 5px 10px;
    font-size: 14px;
    border-bottom: 1px solid rgb(166,166,166);
    background: -webkit-linear-gradient(bottom, #dddddd,  #fafafa);
    background: -o-linear-gradient(top, #dddddd,  #fafafa);
    background: -moz-linear-gradient(top, #dddddd,  #fafafa);
    background: linear-gradient(to top, #dddddd,  #fafafa);
  }

  .container .container-content {
    height: 20px;
  }

  .container-content label {
    margin: 16px;
    display: block;
    font-size: 13px;
    cursor: text;
    background-color: white;
  }

  .container .container-footer {
    height: 26px;
    border-top: 1px solid rgb(166,166,166);
    background-color: white;
  }

  .container .container-footer input {
    width: 50%;
    height: 100%;
    padding-left: 10px;
  }
  /* container */

  .parm-list {
    /*display: block;*/
    /*padding: 16px 0;*/
    /*background-color: #00b3ee;*/
  }

  .parm-list li {
    text-decoration: none;
    list-style: none;
    font-size: 14px;
    padding: 8px 0 8px 8px;
    border-bottom: 1px solid rgb(237,237,237);
    cursor: pointer;
  }

  .parm-list li:hover {
    background-color: rgb(238,238,238);
  }

  .parm-list li:nth-child(odd) {
    /*background-color: rgb(216,236,246);*/
    /*background-color: white;*/
  }

  .parm-list li:nth-child(even) {
    /*background-color: rgb(223,240,216);*/
    /*background-color: rgb(249,249,249);*/
  }

</style>
