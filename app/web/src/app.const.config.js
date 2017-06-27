(function () {

  angular.module('app')
    .constant('APP_CONST', {
      title: 'Villefranche',
      version: 'v3',
      production: true,
      //api: '/api/',
      api: 'https://src.def.science/api/'
    });
})();
