(function () {

  angular.module('app')
    .constant('APP_CONST', {
      title: 'src.moe',
      version: 'v3',
      production: true,
      //api: 'http://localhost:7788/api/',
      api: 'https://src.moe/api/'
    });
})();
