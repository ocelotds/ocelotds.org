angular.module('validationApp', []).controller('ValidationController', ['$scope', function ($scope) {
   var inst = this;
   inst.user = {"name":""};
   inst.validationConstraints = [];
   inst.saveUser = function () {
      console.log("saveUSer");
      userServices.saveUser(inst.user).then(function () {
         console.log("saveUSer ok");
         inst.validationConstraints = [];
         $scope.$apply();
      }).catch(onFault).constraint(function (violations) {
         console.log(violations);
         inst.validationConstraints = violations;
         $scope.$apply();
      });
   };
   var onFault = function (fault) {
      alert(fault.message + "\n" + fault.classname + "\n" + fault.stacktrace.join('\n'));
   };
}]);
