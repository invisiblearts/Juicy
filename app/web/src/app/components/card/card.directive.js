(function() {

  angular.module('app.components')
  .directive('jcCard', jcCard);
function jcCard() {
  var directive = {
    controller: cardCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/card/card.tmpl.html',
    scope: {
      content: '=jcContent',
      showDst: '@jcShowDst',
      utcCn: '@jcShowUtcCn',
      hideCtrl: '@jcHideCtrl',
      hideProgress: '@jcHideProgress'
    },
    bindToController: true
  };
  return directive;
  /*@ngInject*/
  function cardCtrl(APP_CONST, appService,appEvent) {
    var vm = this;
    vm.deleted = false;
    vm.prod = APP_CONST.production;
    vm.isAdmin = appService.isAdmin();
    vm.comment = comment;
    function comment() {
      appEvent.publish('comment', vm.content);
    }

  }
}
})();
