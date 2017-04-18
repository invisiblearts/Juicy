(function () {

  angular.module('app')
    .constant('APP_CONST', {
      title: 'src.moe',
      version: 'v2 alpha5',
      production: true,
      api: 'http://localhost:7788/api/'
    });
})();
