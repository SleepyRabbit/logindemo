/**
 * Created by houenxing on 17/3/7.
 */
'use strict';

export let lineOption = {
  // backgroundColor: 'black',
  // backgroundColor: 'rgb(137, 206, 252)',
  title: {
    // text: 'Health data',
    // show: true,
  },
  tooltip: {
    trigger: 'item',   // 'item' or 'axis'
  },
  legend: {
    // data: ['Health data'],
  },
  xAxis: {
    show: false,
    type: 'category',
    // data: [],
    // axisLabel: {
    //   show: false,
    // },
  },
  yAxis: {
    show: false,
    type: 'value',
    min: -20,
    max: 20,
    scale: true,
  },
  // dataZoom: {
  //   start: 0,
  //   end: 100,
  // },
  // dataRange: {
  //   start: 0,
  //   end: 100,
  // },
  grid: {
    x: 5,       // margin to the left of the father container
    y: 2,       // margin to the top of the father container
    x2: 5,      // margin to the right of the father container
    y2: 2,      // margin to the bottom of the father container
  },
  series: [
    {
      name: 'Health data',
      type: 'bar',
      barMinHeight: 1,
      data: [],
      itemStyle: {
        normal: {
          color: function (params) {
            let colorList = ['blue', "red", "green"];
            return colorList[params.dataIndex%2];
          },

          // color: function(params) {
          //   let colorList = ["red", "green", 'blue'];
          //   if(params.data > 1) {
          //     return colorList[0];
          //   }
          //   else if(params.data === 1) {
          //     return colorList[1];
          //   }
          //   else {
          //     return colorList[2];
          //   }
          // },

          // color: '#0F0',        // set the color of the line/bar
          // color: 'blue',        // set the color of the line/bar
        }
      }
      // markPoint : {
      //   data : [
      //     {type : 'max', name: 'Max'},
      //     {type : 'min', name: 'Min'}
      //   ]
      //;

    },
  ]
};
