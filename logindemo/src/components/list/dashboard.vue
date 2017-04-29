<template>
  <div class="dashboard box flex">

    <!-- device list start -->
    <div class="dev_list">
      <div class="dev_list_content box flex flex-direction-column">
        <h3>Device List:</h3>
        <div class="flex flex-direction-column overflow-y-auto" v-for="(val, num) in getDevices">
          <i @click="onDevice(num, val)" :class="{ 'sel' : num === getActiveNum }">{{val.id}}</i>
        </div>
      </div>
    </div>
    <!-- device list end -->

    <!-- device content start -->
    <div class="dev_data flex flex-direction-column">
      <div class="dev_data_header">
        <div id="healthchart" class="box">

        </div>
      </div>

      <div class="dev_data_content flex-grow-1 flex">
        <div class="dev_data_content_rpc flex flex-direction-column">
          <div class="dev_data_content_rpc_header flex">
            <div class="dev_data_content_rpc_header_help">
              <button @click="onShowModal" class="box no-border"><i class="fa fa-cog"></i>Helper</button>
            </div>
            <div class="dev_data_content_rpc_header_command flex-grow-1">
              <textarea type="text" class="box no-border no-outline" v-model="rpc_command"></textarea>
            </div>
            <div class="dev_data_content_rpc_header_set">
              <button @click="onSend" class="box no-border"><i class="fa fa-binoculars"></i>Send</button>
            </div>
          </div>
          <div class="dev_data_content_rpc_content flex-grow-1 box">
            <textarea type="text" class="box no-border no-outline" v-model="rpc_message"></textarea>
          </div>
        </div>
        <div class="dev_data_content_info flex flex-direction-column">
          <div class="info-header box flex flex-justify-content-space-between flex-align-items-center">
            <h3><i class="fa fa-cog"></i><strong>Information</strong></h3>
            <div class="info-header-btn">
              <button @click="onRefresh" class="box no-border"><i class="fa fa-refresh"></i>Refresh</button>
            </div>
          </div>

          <div class="info-list box flex-grow-1">
            <!--<div class="box overflow-y-auto">-->
              <!--&lt;!&ndash;<ul class="flex flex-direction-column" v-for="(val, index) in dev_message">&ndash;&gt;-->
                <!--&lt;!&ndash;<li>{{index}} : {{val}}</li>&ndash;&gt;-->
              <!--&lt;!&ndash;</ul>&ndash;&gt;-->
            <!--</div>-->
            <textarea type="text" class="box no-border no-outline" v-model="info_message"></textarea>
          </div>
        </div>
      </div>

      <div class="dev_data_footer">
        <textarea id="console" v-model="console_message" class="box overflow-y-auto"></textarea>
      </div>
    </div>

    <!-- rpc modal area start -->
    <rpc_modal v-if="show_modal" :dev="dev" :id="id" @confirm="onConfirmRpcModal" @close="onCloseRpcModal"></rpc_modal>
    <!-- rpc modal area end -->

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ds from '../../deepstream/ds'
  import rpc_modal from './modal/rpc_modal.vue'
  import echarts from 'echarts';
  import { lineOption } from '../../assets/echarts/option'

  var dataNum = 120;

  export default {
    name: 'dashboard',
    components: {
      rpc_modal,
    },
    data() {
      return {
        timer: null,
        health_x_data: [dataNum],
        health_y_data: [dataNum],
        healthChart: null,
        show_modal: false,
        rpc_command: '',
        rpc_message: 'PRC message display area.',
        info_message: 'Information display area.',
        console_message: "",
//        dev_message: 'Device Message.',
        dev: 0,                //当前选择的设备id
        id: 0,
        lastStat: null,
      }
    },
    methods: {
      ...mapActions([
        'setActiveNum',
      ]),
      onShowModal: function () {
        this.id = parseInt(10000*Math.random());
        this.show_modal = true;
      },
      onCloseRpcModal: function () {
        this.show_modal = false;
      },
      onConfirmRpcModal: function(data)  {
        this.show_modal = false;
        this.rpc_command = JSON.stringify(data);
      },
      onSend: function () {
        let ds_rpc_param = JSON.parse(this.rpc_command);
        ds.sendRpc('rpc_otu_call', ds_rpc_param, (err, ret) => {
            if(err === null) {      // 没有错误
              this.rpc_message = JSON.stringify(ret, null, 2);
            }
            else {
              this.rpc_message = err;
            }
        });
      },
      onSubscribe: function () {
        ds.subscribe(255, (value) => {
//            console.log(value);
//          this.dev_message = value;
          this.updateChart(value);
        });
      },
//      onRefresh是Refresh按钮的响应函数，向服务器发送"rpc_otu_call"RPC指令，获取"uCast.info"信息
      onRefresh: function () {
        if(this.getActiveDev !== null) {
          let ds_rpc_param = {
            D: Number,  //D字段指示下发设备DID
            R: {     //R字段指示是下行请求
              method: "uCast.info",
              params: {},
              //json-rpc id，用于标定请求和回应对应关系
              id: parseInt(10000*Math.random()),   //只有需要RPC有返回时才需要该字段
            }
          };
          ds_rpc_param.D = parseInt(this.getActiveId);   // id为字符串，讲其转化成数字
          ds.sendRpc('rpc_otu_call', ds_rpc_param, (err, ret) => {
//              console.log(err);
//              console.log(ret);
            if(err === null) {                           // 未出现错误
              if(ret.hasOwnProperty('result')) {
                this.info_message = JSON.stringify(ret.result, null, 2);
              }
              else {
                this.info_message = 'Device offline';
              }
            }
            else {                                       // 出现错误
              this.info_message = err;
            }
          });
        }
        else {
          this.info_message = 'Please select a device first!';
        }
      },
      getStat: function () {
          this.onRefresh();

//发送"rpc_otu_call"指令，获取state信息
          let ds_rpc_param = {
            D: Number,  //D字段指示下发设备DID
          };
          ds_rpc_param.D = this.dev;   // id为字符串，将其转化成数字
          ds.sendRpc('rpc_otu_call', ds_rpc_param, (err, ret) => {
//            this.info_message = JSON.stringify(ret, null, 2);
            if(err === null) {              // 没有错误
              //检查返回的对象中是否有online属性
              if(ret.hasOwnProperty('online')) {
                if(ret.online) {                //设备在线
                  if (this.lastStat !== null) {
                    let upReq = ret.upReq - this.lastStat.upReq;
                    let upNotify = ret.upNotify - this.lastStat.upNotify;
                    let upKplv = ret.upKplv - this.lastStat.upKplv;
                    let upFlow = upReq + upNotify + upKplv;
                    this.updateChart(upFlow);
//                    console.log(upFlow);

                    let dnReq = ret.dnReq - this.lastStat.dnReq;
                    let dnNotify = ret.dnNotify - this.lastStat.dnNotify;
                    let dnFlow = dnReq + dnNotify;
                    dnFlow = -dnFlow;
                    this.updateChart(dnFlow);
//                    console.log(dnFlow);
                    this.lastStat = ret;
                  }
                  else {
                    this.lastStat = ret;
                  }
                }
                else {                 //设备不在线
                }
              }
            }
            else {                      // 出现错误
            }
          });
      },
      onDevice: function (num, dev) {
        if(this.getActiveDev !== null) {
          ds.unsubscribe(this.getActiveId);    // Unsubscribe active device
          if(this.timer !== null) {
              clearInterval(this.timer);
              this.timer = null;
          }
        };
        this.setActiveNum(num);
        this.dev = parseInt(dev.id);
        this.initChart();
        ds.subscribe(dev.id, (value) => {
          if(this.console_message.length !== 0) {
            this.console_message += '\r\n';
          }
          let timestamp = this.getTime();
          this.console_message += timestamp;
          let str = JSON.stringify(value);
          this.console_message += str;

          /*** 虽然teatarea绑定的数据console_message更新了，但是textarea的scroll高度并没有立即更新，估计是vue的数据绑定的机制导致的，所以做个定时，
           100ms之后再去获取scrollHeight ***/

          this.$nextTick(function () {
            document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
          }, 100);
//          this.updateChart(value);
        });

        /**** 设置定时器，每隔3秒发一次RPC指令，获取设备工作状态 ****/
        this.timer = setInterval(this.getStat , 3000);
        /**** 设置定时器，每隔3秒发一次RPC指令，获取设备工作状态 ****/
      },
      initChart: function () {
        this.healthChart = echarts.init(document.getElementById('healthchart'), 'vintage');
        for(let i = 0; i<dataNum; i++) {
          this.health_x_data[i] = 0;
          this.health_y_data[i] = 0;
        }
        lineOption.xAxis.data = this.health_x_data;
        lineOption.series[0].data = this.health_y_data;
        this.healthChart.setOption(lineOption);
      },
      updateChart: function (data) {
        this.health_x_data.shift();
        this.health_x_data.push(data.time);
        this.health_y_data.shift();
        this.health_y_data.push(data);
        lineOption.xAxis.data = this.health_x_data;
        lineOption.series[0].data = this.health_y_data;
        this.healthChart.setOption(lineOption);
      },
      getTime: function () {
        let now=new Date();
        let hour = now.getHours();
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        };
        let minute = now.getMinutes();
        if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
        };
        let second = now.getSeconds();
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        return hour + ':' + minute + ':' + second + '   ';
      },
      init: function () {
        this.initChart();
        if(this.getActiveDev !== null) {
          this.dev = parseInt(this.getActiveDev.id);
          ds.subscribe(this.getActiveId, (value) => {
            let timestamp = this.getTime();
            this.console_message += timestamp;
            let str = JSON.stringify(value);
            this.console_message += str;
            this.console_message += '\r\n';
          });
        }
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
      this.$nextTick(this.init, 100);
    },
    beforeDestroy: function () {
      if(this.getActiveDev !== null) {
//        console.log(this.getActiveId)
        ds.unsubscribe(this.getActiveId);    // Unsubscribe active device
        if(this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .dashboard {
  }

  #healthchart {
  }

  /********** device list start **********/
  .dev_list {
    width: 15%;
    height: 100%;
    /*padding: 5px;*/
    border-right: 2px solid rgb(220,220,220);
  }

  .dev_list_content {
    background: white;
    border-radius: 4px;
  }

  .dev_list h3 {
    padding: 15px 0 15px 10px;
    border-bottom: 2px solid rgb(220,220,220);
  }

  .dev_list i {
    font-size: 14px;
    color: rgb(48,165,255);
    cursor: pointer;
    text-decoration: none;
    padding: 10px 0 10px 10px;
    width: 100%;
    border-bottom: 1px solid rgb(220, 220, 220);
  }

  .dev_list i:hover {
    color: white;
    background-color: rgb(66,187,248);
    box-shadow: 3px 3px 5px rgb(220, 220, 220);
  }

  .dev_list .sel {
    color: white;
    background-color: rgb(66,187,248);
    box-shadow: 3px 3px 5px rgb(220, 220, 220);
  }
  /********** device list end **********/

  /********** device data start **********/
  .dev_data {
    width: 85%;
    height: 100%;
  }

  /********** header start **********/
  .dev_data_header {
    height: 60px;
    /*background-color: white;*/
    /*border-bottom: 1px solid rgb(205, 210, 210);*/
    border-bottom: 2px solid rgb(220, 220, 220);
  }
  /********** header end **********/

  /********** content start **********/
  .dev_data_content {
    height: 20px;
    /*background-color: white;*/
    border-bottom: 4px solid rgb(220, 220, 220);
    /*border-bottom: 10px solid blue;*/
  }

  .dev_data_content_rpc {
    width: 70%;
    /*border-right: 1px solid rgb(205, 210, 210);*/
    border-right: 2px solid rgb(220, 220, 220);
  }

  .dev_data_content_rpc_header {
    height: 60px;
    /*border-bottom: 1px solid rgb(205, 210, 210);*/
    border-bottom: 2px solid rgb(220, 220, 220);
  }

  .dev_data_content_rpc_header_help {
    width: 60px;
    border-right: 1px solid rgb(220, 220, 220);
  }

  .dev_data_content_rpc_header_command {
    width: 60px;
  }

  .dev_data_content_rpc_header_set {
    width: 60px;
    /*border-left: 1px solid rgb(205, 210, 210);*/
    border-left: 1px solid rgb(220, 220, 220);
  }

  .dev_data_content_rpc_content {
    background-color: red;
  }

  .dev_data_content_rpc_content textarea {
    display: block;
    height: 100%;
  }

  .dev_data_content_info {
    width: 30%;
  }
  /********** content end **********/

  /********** footer start **********/
  .dev_data_footer {
    height: 120px;
  }
  /********** footer end **********/

  .dev_data_footer textarea {
    /*font: 12px/2.5 'Courier, monospace';*/
    font-family: monospace;
    font-size: 8px;
    line-height: 1.42857143;
    padding: 0 12px;
    background-color: black;
    color: rgb(59, 187, 51);
    border: none;
  }

  /********** device data end **********/

  /********** button primary start **********/
  button {
    color: white;
    font-size: 12px;
    background: -webkit-linear-gradient(bottom, rgb(0,68,204),rgb(0,120,204));  /* Safari */
    background: -o-linear-gradient(top, rgb(0,68,204),rgb(0,120,204));    /* Opera */
    background: -moz-linear-gradient(top, rgb(0,68,204),rgb(0,120,204));  /* Firefox */
    background: linear-gradient(to top, rgb(0,68,204),rgb(0,120,204));
  }

  button i {
    padding-right: 4px;
  }

  button:hover {
    cursor: pointer;
    background: -webkit-linear-gradient(bottom, rgb(0,68,204),rgb(0,100,204));  /* Safari */
    background: -o-linear-gradient(top, rgb(0,68,204),rgb(0,100,204));    /* Opera */
    background: -moz-linear-gradient(top, rgb(0,68,204),rgb(0,100,204));  /* Firefox */
    background: linear-gradient(to top, rgb(0,68,204),rgb(0,100,204));
  }

  button:active {
    cursor: pointer;
    background: rgb(0,20,204);
  }

  button:focus {
    outline: none;
  }
  /********** button primary end **********/

  /********** info start **********/
  .info-header {
    height: 60px;
    background: -webkit-linear-gradient(bottom, #dddddd,  #fafafa);
    background: -o-linear-gradient(top, #dddddd,  #fafafa);
    background: -moz-linear-gradient(top, #dddddd,  #fafafa);
    background: linear-gradient(to top, #dddddd,  #fafafa);
   }

  .info-header h4,i {
    padding: 0 5px;
  }

  .info-header-btn {
    width: 60px;
    height: 100%;
  }

  .info-list {
    /*background-color: rebeccapurple;*/
  }

  /********** info end **********/

  textarea {
    resize: none;
    padding: 5px;
  }

  textarea:focus {
    outline: none;
  }

</style>
