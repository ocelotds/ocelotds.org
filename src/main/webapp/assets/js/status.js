ocelotController.addOpenListener(function () {
   new OcelotServices().subscribe("ocelot-status").message(function (msg) {
      var status = document.getElementById("status");
      if (msg === "OPEN") {
         status.src="assets/ws-opened.svg";
      } else {
         status.src="assets/ws-closed.svg";
      }
   });
});


