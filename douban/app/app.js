;
(function (angular) {
  var doubanApp = angular.module('itcast.douban', [])

  doubanApp.controller('MainController', [
    '$scope',
    '$http',
    'HttpService',
    function ($scope, $http, HttpService) {
      var pageSize = 3
      $scope.title = 'Loading...'
      $scope.data = []
      $scope.totalCount = 0
      $scope.totalPage = 0
      $scope.page = 2

      // Angular 的 $http.jsonp 方法
      // 只需要在请求路径中通过查询字符串指定一个 JSON_CALLBACK 这里是一个标记
      // ng 在真正发请求的时候，会把这个标记替换为 callback=xxx 格式的字符串然后放到查询字符串中
      // ng 自动生成一个函数名：angular.callbacks._0
      HttpService.jsonp('https://api.douban.com/v2/movie/in_theaters', {
        start: ($scope.page - 1) * pageSize,
        count: pageSize
      }, function (data) {
        $scope.totalCount = data.total
        $scope.totalPage = Math.ceil(($scope.totalCount / pageSize))
        $scope.title = data.title
        $scope.subjects = data.subjects
          // 如果在异步代码中修改了视图模型对象，必须通过 $scope.$apply() 方法强制视图模型更新
        $scope.$apply()
      });

      // 翻页按钮
      $scope.go = function (page) {
        console.log(page)
      }
    }
  ])
})(angular)
