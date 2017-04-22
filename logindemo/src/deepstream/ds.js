/**
 * Created by houenxing on 17/1/19.
 */
'use strict';

import ds from 'deepstream.io-client-js';

// const destination = '192.168.31.109:6020';
const destination = 'ucast.cc:6020';
// const destination = '127.0.0.1:6020';

// var client = null;

var client = ds(destination).login({
  username: 'ws_d1',
  password: 'thisisatestkey',
});

export default {
  login: function (user, cb) {
    client = ds(destination).login(user, cb);
    // console.log(client);
  },
  subscribe: function (devId, cb) {
    let path = 'event/ot/devlog/' + devId;
    console.log('Subscribe ' + path);
    client.event.subscribe(path, cb);
  },
  unsubscribe: function (devId) {
    let path = 'event/ot/devlog/' + devId;
    console.log('unSubscribe ' + path);
    client.event.unsubscribe(path);
  },
  subscribeRecord: function (cb) {
    var record = client.record.getRecord("record/otu/info/255");
    record.subscribe(cb);
  },
  unsubscribeRecord: function () {
    var record = client.record.getRecord("record/otu/info/255");
    record.unsubscribe();
  },
  sendRpc: function (rpc, ds_rpc_param, cb) {
    // var rpc = {};
    // rpc.method = "uCast.info";
    // rpc.params = {};
    // rpc.id = 12345;
    //
    // var closure = {}
    // closure.D = 255;
    // closure.R = rpc;
    //
    // console.log(closure);
    //
    // client.rpc.make("rpc_otu_call", closure, cb);

    client.rpc.make(rpc, ds_rpc_param, cb);

    // var ds_rpc_param = {
    //   D:255,  //D字段指示下发设备DID
    //   R:{     //R字段指示是下行请求
    //     method: "uCast.info",
    //     params:{},
    //     //json-rpc id，用于标定请求和回应对应关系
    //     id:234567   //只有需要RPC有返回时才需要该字段
    //   }
    // };
    // client.rpc.make("rpc_otu_call", ds_rpc_param, function(err, ret) {
    //   var msg = JSON.stringify(ret, null, 2)
    //   console.log(ret);
    //   console.log(msg);
    // });

    // var ds_stat_param = {
    //   D:255   //D字段指示下发设备DID
    //   //  <--  注意这里，没有 R字段
    // }
    // client.rpc.make("rpc_otu_call", ds_stat_param, function(err, ret) {
    //   var msg = JSON.stringify(ret, null, 2)
    //     console.log(ret);
    //     console.log(msg);
    // })
  },
  subscription: function (cb) {
    // var client = ds(destination);
  },
}
