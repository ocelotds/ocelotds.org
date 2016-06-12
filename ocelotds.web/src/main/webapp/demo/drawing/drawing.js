'use strict';
var color = "black", subCanvasEvent, imageView, stage, pencil, guid;
function S4() {
	 return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
// generate an unique ident
guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
// The drawing pencil.
pencil = {
	mousedown: function (ev) {
		var ctx = this.drawingArea(ev.id).getContext('2d');
		ctx.beginPath();
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.shadowBlur = 1;
		ctx.shadowColor = ev.color;
		ctx.strokeStyle = ev.color;
		ctx.lineWidth = 3;
		ctx.moveTo(ev.x, ev.y);
	},
	mousemove: function (ev) {
		var ctx = this.drawingArea(ev.id).getContext('2d');
		ctx.lineTo(ev.x, ev.y);
		ctx.stroke();
	},
	mouseup: function (ev) {
		this.endDrawing(ev);
	},
	mouseleave: function (ev) {
		this.endDrawing(ev);
	},
	mouseout: function (ev) {
		this.endDrawing(ev);
	},
	endDrawing: function (ev) {
		this.mousemove(ev);
		this.saveDrawing(ev.id);
	},
	drawingArea: function (id) {
		var canvas = document.getElementById(id);
		if (!canvas) {
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', "430px");
			canvas.setAttribute('height', "300px");
			canvas.setAttribute('id', id);
			stage.insertBefore(canvas, imageView);
		}
		return canvas;
	},
	saveDrawing: function (id) {
		var canvas = this.drawingArea(id);
		document.getElementById('imageView').getContext('2d').drawImage(canvas, 0, 0);
		stage.removeChild(canvas);
	}
};
stage = document.getElementById('stage');
// Attach mouse event listeners for send to back-end
imageView = document.getElementById('imageView');
imageView.addEventListener('mousedown', function (event) {
	imageView.addEventListener('mousemove', sendMouseEvent, false);
	imageView.addEventListener('mouseup', endDrawing, false);
	imageView.addEventListener('mouseleave', endDrawing, false);
	imageView.addEventListener('mouseout', endDrawing, false);
	color = getColor();
	sendMouseEvent(event);
}, false);
// Subscribe Topic
subscriberFactory.createSubscriber("subscribers:eventCanvas").message(function (nb) {
	document.getElementById("subscribersNumber").innerHTML = nb;
});
subCanvasEvent = subscriberFactory.createSubscriber("eventCanvas").message(function (evt) {
	pencil[evt.type](evt);
});
function endDrawing(event) {
	sendMouseEvent(event);
	imageView.removeEventListener('mousemove', sendMouseEvent);
	imageView.removeEventListener('mouseup', sendMouseEvent);
	imageView.removeEventListener('mouseleave', sendMouseEvent);
	imageView.removeEventListener('mouseout', sendMouseEvent);
}
function sendMouseEvent(ev) {
	drawingServices.pushCanvasEvent({"id":guid, "x": ev.offsetX | ev.layerX, "y": ev.offsetY | ev.layerY, "type": ev.type, "color": color});
}
function getColor() {
	var colors = document.getElementsByName('color');
	for(var i=0; i<colors.length; i++) {
		var color = colors[i];
		if(color.checked) {
			return color.nextSibling.style.color;
		}
	}
	return "black";
}


