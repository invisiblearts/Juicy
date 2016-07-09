(function () {

  angular.module('app')
    .config(navConfig);

  /*@ngInject*/
  function navConfig(jcNavProvider, appServiceProvider) {
      jcNavProvider.$get().addMenu(
        [
          {title: 'Friends!', state: 'links', order: 8}
        ]
      );
  }
})();