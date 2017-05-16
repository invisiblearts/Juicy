(function () {
  angular.module('app')
    .config(navConfig);

  function navConfig(jcNavProvider) {
    jcNavProvider.$get().addMenu(
      [
        {title: '自述', state: 'resume', order: 14}
      ]
    );

  }
})();