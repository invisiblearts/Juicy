(function () {

  angular.module('app')
    .constant('APP_CONST', {
      title: 'src.moe',
      version: 'v2 alpha5',
      production: true,
      api: 'https://src.moe/api/'
    });
})();
