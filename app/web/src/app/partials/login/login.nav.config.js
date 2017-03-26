(function () {
  angular.module('app')
  .config(navConfig);

function navConfig(jcNavProvider, appServiceProvider) {
    jcNavProvider.$get().addMenu(
      [
        {title: '登录', state: 'login', order: 1}
      ]
    );
}
})();