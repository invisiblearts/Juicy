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
      init();
      /////////////////////////
      function init(){

        var burgerMenu = function() {

          jQuery('.js-fh5co-nav-toggle').on('click', function(event) {
            event.preventDefault();
            var $this = jQuery(this);
            if( jQuery('body').hasClass('menu-show') ) {
              jQuery('body').removeClass('menu-show');
              jQuery('#fh5co-main-nav > .js-fh5co-nav-toggle').removeClass('show');
            } else {
              jQuery('body').addClass('menu-show');
              setTimeout(function(){
                jQuery('#fh5co-main-nav > .js-fh5co-nav-toggle').addClass('show');
              }, 900);
            }
          })
        };

        burgerMenu()
      }

      function gotoState(state) {
        $state.go(state);
      }

    }
  }
})();