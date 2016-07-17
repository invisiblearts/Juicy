(function() {
  angular.module('app')
  .config(navConfig);

function navConfig(jcNavProvider) {
  jcNavProvider.$get().addMenu(
    [
      {title: 'Resume', state: 'resume', order: 14}
    ]
  );

}
})();