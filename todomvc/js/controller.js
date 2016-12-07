;
(function (angular) {
  angular.module('TodoApp')
    .controller('MainController', ['$scope', function ($scope) {
      $scope.title = 'Potato List'
      $scope.todos = [
        { id: 1, text: '吃饭', completed: false },
        { id: 2, text: '睡觉', completed: false },
        { id: 3, text: '相亲', completed: true }
      ]

      $scope.editingId = 0

      $scope.getEditing = function (id) {
        $scope.editingId = id
      }

      // 回车保存编辑内容
      $scope.edit = function () {
        $scope.editingId = 0
      }

      $scope.todoFilter = {}

      $scope.checkAll = false
      $scope.toggleAll = function () {
        $scope.todos.forEach(function (todo) {
          todo.completed = $scope.checkAll
        })
      }
      $scope.text = ''

      // add
      $scope.add = function (text) {
        if ($scope.text.trim().length === 0) {
          return
        }
        var id = 0
        $scope.todos.forEach(function (todo) {
          if (todo.id > id) {
            id = todo.id
          }
        })
        $scope.todos.push({
          id: id + 1,
          text: text,
          completed: false
        })
        $scope.text = ''
      }


      // removeById
      $scope.removeById = function (id) {
        // 根据 id 找到数组中的索引
        // 根据索引删除该项
        var index
          // forEach 一旦开启，无法停止
          // break、return 都无法停止
          // some 方法会从头开始遍历数组每一项
          // 只要其中一项在函数中返回 true 则 some 为 true 直接停止执行
        $scope.todos.some(function (todo, i) {
          if (todo.id === id) {
            index = i
            return true
          }
        })

        // 严谨的做法是：
        // 上面的遍历找索引可能没有匹配项
        // 所以遍历结束应该判断一下 index 的值
        // 如果 index 有值，说明找到
        // 如果 index 没有值，说明没找到
        if (index === undefined) {
          return
        }
        $scope.todos.splice(index, 1)
      }

      $scope.clearAllCompleted = function () {
        var todos = []
        $scope.todos.forEach(function (todo) {
          if (!todo.completed) {
            todos[todos.length] = todo
          }
        })
        $scope.todos = todos
      }
    }])
})(angular)
