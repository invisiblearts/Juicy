(function () {

  angular.module('app')
    .config(navConfig);

  /*@ngInject*/
  function navConfig(jcNavProvider, appServiceProvider) {
    jcNavProvider.$get().addMenu(
      [
        {title: '友链', state: 'links', order: 11}
      ]
    );
  }
})();