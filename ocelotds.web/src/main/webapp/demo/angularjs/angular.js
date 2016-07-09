(function () { // closure
   angular.module('todoApp', []); // create module
   angular.module('todoApp').controller('TodoListController', TodoListController); // add controller
   TodoListController.$inject = ['$scope']; // inject angular scope
   function TodoListController($scope) { // controller
      var ctrl = this;
      ctrl.todos = [];
      ctrl.todoText = "";
      ctrl.addTodo = addTodo;
      ctrl.remaining = remaining;
      ctrl.archive = archive;
      ctrl.update = update;
      ctrl.reset = reset;
      ctrl.getTodos = getTodos;

      ctrl.addSub = null;
      ctrl.todosSub = null;
      ctrl.updSub = null;

      activate();
      $scope.$on('$destroy', desactivate);

      function activate() {
         console.log("subscribers initialisation...");
         ctrl.todosSub = subscriberFactory.createSubscriber("update-todos").message(function (todos) {
            ctrl.todos = todos;
            $scope.$apply(); // apply to angualr scope
         });
         ctrl.addSub = subscriberFactory.createSubscriber("add-todo").message(function (todo) {
            ctrl.todos.push(todo);
            $scope.$apply(); // apply to angualr scope
         });
         ctrl.updSub = subscriberFactory.createSubscriber("update-todo").message(function (todo) {
            ctrl.todos.every(function (t) {
               if (t.text === todo.text) {
                  t.done = todo.done;
                  $scope.$apply(); // apply to angualr scope
               }
               return t.text !== todo.text; // continue or exit every;
            })
         });
      }
      function desactivate() {
         console.log("subscribers cleaning...");
         if (ctrl.todosSub) ctrl.todosSub.unsubscribe();
         if (ctrl.addSub) ctrl.addSub.unsubscribe();
         if (ctrl.updSub) ctrl.updSub.unsubscribe();
      }
      function addTodo() {
         ctrl.todos.forEach(function (t) {
            if (t.text === ctrl.todoText) {
               return; // exit function;
            }
         });
         todoServices.addTodo(ctrl.todoText).catch(onFault); // todo will be add by subscriber
         ctrl.todoText = ''; // clean input
      }
      function remaining() {
         var count = 0;
         angular.forEach(ctrl.todos, function (todo) {
            count += todo.done ? 0 : 1;
         });
         return count;
      }
      function archive() {
         console.log("call todoServices.archive");
         todoServices.archive().catch(onFault); // the result will be receive by subscriber
      }
      function update(todo) {
         console.log("call todoServices.updateTodo");
         todoServices.updateTodo(todo).catch(onFault); // the result will be receive by subscriber
      }
      function reset() {
         console.log("call todoServices.init");
         todoServices.init().catch(onFault); // the result will be receive by subscriber
      }
      function onFault(fault) {
         alert(fault.message + "\n" + fault.classname + "\n" + fault.stacktrace.join('\n'));
      }
      function getTodos() {
         console.log("call todoServices.getTodos");
         todoServices.getTodos().then(function (todos) {
            ctrl.todos = todos; // receive todos
            $scope.$apply(); // apply to angular scope
         }).catch(onFault);
      }
   }
})();