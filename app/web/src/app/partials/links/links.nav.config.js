(function () {

  angular.module('app')
    .config(navConfig);

  /*@ngInject*/
  function navConfig(jcNavProvider, appServiceProvider) {
    if (appServiceProvider.$get().isAdmin()) {
      jcNavProvider.$get().addMenu(
        [
          {title: 'Friends!', state: 'links', order: 8}
        ]
      );
    }
  }
})();