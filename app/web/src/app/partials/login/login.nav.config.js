(function () {
  angular.module('app')
  .config(navConfig);

function navConfig(jcNavProvider, appServiceProvider) {
    jcNavProvider.$get().addMenu(
      [
        {title: 'Login', state: 'login', order: 14}
      ]
    );
}
})();