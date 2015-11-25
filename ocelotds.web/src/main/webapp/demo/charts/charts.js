'use strict';
if(window.chartServices === undefined) alert("Thid demo works only in Java EE server");
ocelotController.addOpenListener(function () {
   Highcharts.setOptions({
      global: {useUTC: false}
   });
   var chart;
   chartServices.getDatas(1000).then(function(datas) {
      chart = new Highcharts.StockChart({
         chart: {renderTo: 'graph-area'},
         rangeSelector: {
            buttons: [
               {count: 30, type: 'second', text: '30s'}, 
               {count: 2, type: 'minute', text: '2m'},
               {count: 5, type: 'minute', text: '5m'}, 
               {type: 'all', text: 'All'}
            ],
            inputEnabled: false,
            selected: 0
         },
         title: {text: 'Live random data'},
         exporting: {enabled: true},
         series: [{data: datas}]
      });
   });
   new Subscriber("values").message(function (vals) {
      chart.series[0].addPoint([vals[0], vals[1]], true, true);
   });
});
ocelotController.addCloseListener(function () {
   ocelotController.open();
});
