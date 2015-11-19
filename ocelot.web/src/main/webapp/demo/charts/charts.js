'use strict';
var chart;
ocelotController.addOpenListener(function () {
   Highcharts.setOptions({
      global: {
         useUTC: false
      }
   });
   chart = new Highcharts.Chart({
      chart: {
         renderTo: 'graph-area',
         type: 'spline',
         animation: Highcharts.svg, // don't animate in old IE
         marginRight: 10,
         events: {
            load: function () {
               new Subscriber("values").message(function (vals) {
                  chart.series[0].addPoint([vals.time, vals.value], true, true);
               });
            }
         }
      },
      title: {
         text: 'Live random data'
      },
      xAxis: {
         type: 'datetime',
         tickPixelInterval: 150
      },
      yAxis: {
         title: {
            text: 'Value'
         },
         plotLines: [{
               value: 0,
               width: 1,
               color: '#808080'
            }]
      },
      tooltip: {
         formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
               Highcharts.numberFormat(this.y, 2);
         }
      },
      legend: {
         enabled: false
      },
      exporting: {
         enabled: false
      },
      series: [{
            name: 'Random data',
            data: (function () {
               // generate an array of random data
               var data = [],
                  time = (new Date()).getTime(),
                  i;
               for (i = -19; i <= 0; i += 1) {
                  data.push({
                     x: time + i * 1000,
                     y: Math.random()
                  });
               }
               return data;
            }())
         }]
   });
});
