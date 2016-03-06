angular.module('todoApp', []).controller('TodoListController', ['$scope', function ($scope) {
   var todoList = this;
   todoList.todos = [];
   todoList.todoText = "";
   todoList.addTodo = function () {
      todoServices.addTodo(todoList.todoText).then(function (todo) {
         todoList.todos.push(todo);
         todoList.todoText = '';
			$scope.$apply();
      }).catch(onFault);
   };
   todoList.remaining = function () {
      var count = 0;
      angular.forEach(todoList.todos, function (todo) {
         count += todo.done ? 0 : 1;
      });
      return count;
   };
   todoList.archive = function () {
		console.log("call todoServices.archive");
      todoServices.archive().then(function (todos) {
         todoList.todos = todos;
			$scope.$apply();
      }).catch(onFault);
   };
   todoList.update = function (todo) {
		console.log("call todoServices.updateTodo");
      todoServices.updateTodo(todo).then(function (todo) {
		}).catch(onFault);
   };
   todoList.reset = function () {
		console.log("call todoServices.init");
      todoServices.init().then(function () {
			console.log("init ok call refresh");
         todoList.refresh();
			$scope.$apply();
      }).catch(onFault);
   };
   todoList.refresh = function () {
		console.log("call todoServices.getTodos");
      todoServices.getTodos().then(function (todos) {
         todoList.todos = todos;
			$scope.$apply();
      }).catch(onFault);
   };
   var onFault = function (fault) {
      alert(fault.message + "\n" + fault.classname + "\n" + fault.stacktrace.join('\n'));
   };
   $scope.init = function() {
      todoList.refresh();
   };
}]);
