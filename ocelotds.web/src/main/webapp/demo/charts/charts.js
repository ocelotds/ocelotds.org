'use strict';
if(window.chartServices === undefined) alert("Thid demo works only in Java EE server");
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
new Subscriber("values").then(function(nb) {
	console.log("Subscribers to values :"+nb);
}).catch(function(fault) {
	console.log(fault);
}).message(function (vals) {
	chart.series[0].addPoint([vals[0], vals[1]], true, true);
});
