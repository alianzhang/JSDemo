;
(function (angular) {
  angular.module('itcast.douban')
    .filter('getNames', [function () {
      return function (directors, split) {
        var str = ''
        directors.forEach(function (director, index) {
          str += director.name + (index === directors.length - 1 ? '' : split)
        })
        return str
      }
    }])
})(angular)
