angular.module('chatApp', []).controller('ChatController', ['$scope', function ($scope) {
   var chatCtrl = this, chatServices = new ChatServices();
   chatCtrl.chatters = [], chatCtrl.messages = [], 
   chatCtrl.chatter = "", chatCtrl.message = "", 
   chatCtrl.subChatRoom, chatCtrl.subChatters, 
   chatCtrl.registerOn = "", chatCtrl.unregisterOn = "disabled";
   chatCtrl.unregister = function () {
      chatServices.unregister(chatCtrl.chatter).then(function () {
         $scope.$apply(function () {
            chatCtrl.registerOn = "";
            chatCtrl.unregisterOn = "disabled";
            chatCtrl.subChatRoom.unsubscribe();
            chatCtrl.subChatters.unsubscribe();
            chatCtrl.chatters = [];
         });
      }).catch(onFault);
   };
   chatCtrl.register = function () {
      chatCtrl.subChatters = new Subscriber("Chatters").message(function (list) {
         $scope.$apply(function () {
            chatCtrl.chatters = list;
         });
      });
      chatServices.register(chatCtrl.chatter).then(function () {
         $scope.$apply(function () {
            chatCtrl.registerOn = "disabled";
            chatCtrl.unregisterOn = "";
            chatCtrl.subChatRoom = new Subscriber("ChatRoom").message(function (msg) {
               $scope.$apply(function () {
                  msg.pos = "left";
                  if (msg.chatter === chatCtrl.chatter) {
                     msg.pos = "right";
                  }
                  chatCtrl.messages.push(msg);
               });
            });
         });
      }).catch(onFault);
   };
   chatCtrl.post = function () {
      if (chatCtrl.message) {
         chatServices.postMessage({"chatter": chatCtrl.chatter, "text": chatCtrl.message}).then(function () {
            $scope.$apply(function () {
               chatCtrl.message = "";
            });
         }).catch(onFault);
      }
   };
   var onFault = function (fault) {
      alert(fault.message + "\n" + fault.classname + "\n" + fault.stacktrace.join('\n'));
   };
   $scope.init = function () {
      ocelotController.addOpenListener(function () {
         ocelotController.addCloseListener(function () {
            chatServices.unregister(chatCtrl.chatter).then(function () {});
         });
      });
   };
}]);
