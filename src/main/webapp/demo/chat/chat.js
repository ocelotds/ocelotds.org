angular.module('chatApp', []).controller('ChatController', ['$scope', function ($scope) {
   var chatCtrl = this;
   chatCtrl.chatters = [];
   chatCtrl.messages = [];
   chatCtrl.chatter = "";
   chatCtrl.message = "";
   chatCtrl.subChatRoom;
   chatCtrl.subChatters;
   var chatServices = new ChatServices();
   chatCtrl.unregister = function () {
      chatServices.unregister(chatCtrl.chatter).then(function () {
         $scope.$apply(function () {
            chatCtrl.subChatRoom.unsubscribe();
         });
      }).catch(onFault);
   };
   chatCtrl.register = function () {
      chatServices.register(chatCtrl.chatter).then(function () {
         $scope.$apply(function () {
            chatCtrl.registered = true;
            chatCtrl.subChatRoom = new Subscriber("ChatRoom").message(function(msg) {
               $scope.$apply(function () {
                  if(msg.chatter === chatCtrl.chatter) {
                     msg.user = msg.chatter;
                     delete msg.chatter;
                  }
                  chatCtrl.messages.push(msg);
               });
            });
         });
      }).catch(onFault);
   };
   chatCtrl.post = function () {
      if(chatCtrl.message) {
         chatServices.postMessage({"chatter": chatCtrl.chatter, "text": chatCtrl.message}).then(function () {
            $scope.$apply(function () {
               chatCtrl.message = "";
            });
         }).catch(onFault);
      }
   };
   chatCtrl.refresh = function () {
      chatServices.getChatters().then(function (list) {
         $scope.$apply(function () {
            chatCtrl.chatters = list;
         });
      }).catch(onFault);
   };
   var onFault = function (fault) {
      alert(fault.message + "\n" + fault.classname + "\n" + fault.stacktrace.join('\n'));
   };
   $scope.init = function () {
      ocelotController.addOpenListener(function () {
         chatCtrl.refresh();
         chatCtrl.subChatters = new Subscriber("Chatters").message(function(chatterEvent) {
            $scope.$apply(function () {
               if(chatterEvent.type === "ADD") {
                  chatCtrl.chatters.push(chatterEvent.chatter);
               } else {
                  var idx = chatCtrl.chatters.indexOf(chatterEvent.chatter);
                  if(idx!==-1) {
                     chatCtrl.chatters.splice(idx, 1);
                  }
               }
            });
         });
         ocelotController.addCloseListener(function () {
            chatServices.unregister(chatCtrl.chatter).then(function () {
            });
         });
      });
   };
}]);
