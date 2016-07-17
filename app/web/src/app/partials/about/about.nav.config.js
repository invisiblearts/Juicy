(function() {
  angular.module('app')
  .config(navConfig);

function navConfig(jcNavProvider) {
  jcNavProvider.$get().addMenu(
    [
      {title: 'Changelog', state: 'about', order: 15}
    ]
  );

}
})();