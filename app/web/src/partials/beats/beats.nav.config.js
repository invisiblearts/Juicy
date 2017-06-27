(function () {

  angular.module('app')
    .config(navConfig);

  /*@ngInject*/
  function navConfig(jcNavProvider, appServiceProvider) {
    /*
    jcNavProvider.$get().addMenu(
      [
        {title: '造句', state: 'tweets', order: 12}
      ]
    );
    */
  }
})();