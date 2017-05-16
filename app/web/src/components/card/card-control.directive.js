(function () {
  angular.module('app.components')
    .directive('jcCardControl', jcCardControl);

  function jcCardControl() {
    var directive = {
      controller: cardControlCtrl,
      controllerAs: 'vm',
      templateUrl: 'components/card/card-control.tmpl.html',
      require: '^^jcCard',
      scope: {},
      link: postLink,
      bindToController: true
    };
    return directive;

    function postLink(scope, element, attrs, cardCtrl) {
      scope.cardCtrl = cardCtrl;
      scope.vm.content = cardCtrl.content;
      scope.vm.appEvent.subscribe('card_update_' + scope.vm.content._id, scope.vm.handleUpdate, scope); //this scope is problematic , memory leak?

    }

    /*@ngInject*/
    function cardControlCtrl($scope, appEvent, appService, beatsService, angularGridInstance, $state) {
      var vm = this;
      vm.deleteBeats = deleteBeats;
      vm.modifyBeats = modifyBeats;
      vm.submitComment = submitComment;
      vm.comment = comment;
      vm.commentBrief = [];
      vm.getName = getName;
      vm.showMoreComments = showMoreComments;
      vm.showAllComments = false;

      vm.isUser = appService.isUser();
      
      vm.isAdmin = appService.isAdmin();
      vm.appEvent = appEvent;
      vm.handleUpdate = handleUpdate;
      vm.newComment = {

        body: ""
      };
      
      ////////////////////////////////

      function getName(c) {
        return c.user[0] ? c.user[0].username : '阿卡林'; //TODO appService.getNameRand(c._id);
      }

      function pushComments() {
        if (vm.content && vm.content.comments) {
          var idx = vm.content.comments.length > 2 ? 2 : vm.content.comments.length;
          for (var i = 0; i < idx; i++) {
            vm.content.comments[i] != null ? vm.commentBrief[i] = vm.content.comments[i] : angular.noop;
          }
        }
      }

      function deleteBeats() {
        $scope.cardCtrl.deleted = true;
        appEvent.publish('deleteBeats', vm.content._id);
      }

      function modifyBeats() {
        appEvent.publish('modifyBeats', vm.content);
      }

      function comment() {
        appEvent.publish('comment', vm.content);
      }

      function submitComment() {
        beatsService.postComment(vm.content._id, vm.newComment);
      }

      function handleUpdate(event, update) {
        vm.content = update;
        if (angularGridInstance['cards']) {
          angularGridInstance['cards'].refresh();
        }
      }

      function showMoreComments() {
        vm.showAllComments = !vm.showAllComments;
        if (angularGridInstance['cards']) {
          angularGridInstance['cards'].refresh();
        }
      }

      $scope.$watchCollection('vm.content.comments', pushComments);
    }
  }
})();
