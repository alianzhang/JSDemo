;
(function (angular) {
  angular.module('itcast.douban')
    .service('HttpService', ['$window', '$document', function ($window, $document) {
      // 在服务内部直接通过 this 给其添加成员这样的话就可以直接在控制器中加载该服务
      // 使用该服务中的API
      this.jsonp = function (url, queryObj, callback) {
        // 生成全局唯一函数
        var callbackName = 'itcast_' + Math.random().toString().substr(2) + (+new Date())

        // 向全局挂载该函数
        // 当该函数被执行的时候，调用用户传进来的 匿名函数 callback
        // 当匿名函数执行结束之后，把该函数的载体 script 节点给干掉
        $window[callbackName] = function (data) {
          callback(data)
          document.body.removeChild(script)
        }

        var queryString = ''
        
        // 处理查询字符串，生成 key=value&key=value 的格式字符串
        for (var parameterName in queryObj) {
          queryString += parameterName + '=' + queryObj[parameterName] + '&'
        }

        // 1. 创建 script 标签
        var script = document.createElement('script')
        // 2. 设置 src
        script.src = url += '?' + queryString + 'callback=' + callbackName
        // 3. 追加到 DOM 中
        document.body.appendChild(script)
      }
    }])
})(angular)
