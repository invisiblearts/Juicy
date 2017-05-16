(function () {
  angular.module('app')
    .config(navConfig);

  function navConfig(jcNavProvider, appServiceProvider) {
    jcNavProvider.$get().addMenu(
      [
        {title: '🎸🎵', state: 'baladeur', order: 10}
      ]
    );
  }
})();
