(function() {
  angular.module('app')
  .config(navConfig);

function navConfig(jcNavProvider, appServiceProvider) {
  if (appServiceProvider.$get().isAdmin()) {
    jcNavProvider.$get().addMenu(
      [
        {title: '写文', state: 'compose', order: 2}
      ]
    );
  }
}
})();