(function () {
  angular.module('app')
    .config(navConfig);

  function navConfig(jcNavProvider) {
    jcNavProvider.$get().addMenu(
      [
        {title: '作文', state: 'topics', order: 13}
      ]
    );

  }
})();