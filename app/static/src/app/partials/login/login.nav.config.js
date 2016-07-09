(function () {
  angular.module('app')
  .config(navConfig);

function navConfig(jcNavProvider, appServiceProvider) {
  if (appServiceProvider.$get().isAdmin()) {
    jcNavProvider.$get().addMenu(
      [
        {title: 'Login', state: 'login', order: 4}
      ]
    );
  }
}
})();