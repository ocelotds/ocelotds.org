'use strict';
ocelotController.addOpenListener(function () {
   var subCanvasEvent, canvas, context, pencil,
      drawingServices = new DrawingServices();
   // The drawing pencil.
   pencil = {
      mousedown: function (ev) {
         context.beginPath();
         context.moveTo(ev.x, ev.y);
         canvas.addEventListener('mousemove', sendMouseEvent, false);
         canvas.addEventListener('mouseup', sendMouseEvent, false);
      },
      mousemove: function (ev) {
         context.lineTo(ev.x, ev.y);
         context.stroke();
      },
      mouseup: function (ev) {
         this.mousemove(ev);
         canvas.removeEventListener('mousemove', sendMouseEvent);
         canvas.removeEventListener('mouseup', sendMouseEvent);
      }
   };
   // Get the 2D canvas context.
   canvas = document.getElementById('imageView');
   if (!canvas || !canvas.getContext) {
      alert('Error: Canvas element or Context not accessible!');
      return;
   }
   context = canvas.getContext('2d');
   // Attach mouse event listeners for send to back-end
   canvas.addEventListener('mousedown', sendMouseEvent, false);
   // Subscribe Topic
   new Subscriber("subscribers:eventCanvas").message(function (nb) {
      document.getElementById("subscribersNumber").innerHTML = nb;
   });
   subCanvasEvent = new Subscriber("eventCanvas").message(function (evt) {
      pencil[evt.type](evt);
   });
   function sendMouseEvent(ev) {
      drawingServices.pushCanvasEvent({"x": ev.offsetX, "y": ev.offsetY, "type": ev.type});
   }
});
ocelotController.addCloseListener(function () {
   subCanvasEvent.unsubscribe();
});


