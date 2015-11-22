angular.module('todoApp', []).controller('TodoListController', 
['$scope', function ($scope) {
	var todoList = this;
	todoList.todos = [];
   todoList.todoText = "";
	todoList.addTodo = function () {
		todoServices.addTodo(todoList.todoText).then(function (todo) {
         $scope.$apply(function () {
				todoList.todos.push(todo);
				todoList.todoText = '';
         });
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
		todoServices.archive().then(function (todos) {
         $scope.$apply(function () {
				todoList.todos = todos;
               });
      }).catch(onFault);
   };
	todoList.update = function (todo) {
		todoServices.updateTodo(todo).then(function (todo) {
		}).catch(onFault);
	};
	todoList.init = function () {
		todoServices.init().then(function () {
         $scope.$apply(function () {
            todoList.refresh();
         });
      }).catch(onFault);
   };
	todoList.refresh = function () {
		todoServices.getTodos().then(function (todos) {
         $scope.$apply(function () {
				todoList.todos = todos;
         });
      }).catch(onFault);
   };
   var onFault = function (fault) {
      alert(fault.message + "\n" + fault.classname + "\n" + fault.stacktrace.join('\n'));
   };
	$scope.init = function() {
      ocelotController.addOpenListener(function() {
         todoList.refresh();
      });
   };
}]);
