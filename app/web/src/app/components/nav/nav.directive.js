(function () {
  angular.module('app.components')
    .directive('jcNav', jcNav);

  function jcNav($state) {
    var directive = {
      controller: navCtrl,
      controllerAs: 'vm',
      templateUrl: 'components/nav/nav.tmpl.html',
      bindToController: true
    };
    return directive;
    /*@ngInject*/
    function navCtrl(jcNav, $scope, $filter, appEvent, APP_CONST, $state, $rootScope) {
      var vm = this;
      vm.state = $state;
      vm.appTitle = APP_CONST.title;
      vm.appVersion = APP_CONST.version;
      vm.navs = $filter('orderBy')(jcNav.navConfig, 'order', true);
      vm.gotoState = gotoState;

      /////////////////////////


      function gotoState(state) {
        $state.go(state);
      }

    }
  }
})();