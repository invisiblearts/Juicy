(function () {
  angular.module('app.modules')
  .controller('topicsDetailCtrl', topicsDetailCtrl);

function topicsDetailCtrl($scope, $http, $state, $document, appEvent,appService, topicsService) {
  var vm = this;
  vm.topicData = {};
  vm.topicId = $state.params.id;
  vm.submitComment = submitComment;
  vm.isUser = appService.isUser();
  init();

  /////////

  function init() {
    if (!vm.topicId) {
      $state.go("beats");
    }
    topicsService.fetchOne(vm.topicId).success(res=>vm.topicData = res[0]);
  }

  function handleEditTopic(event, id) {
    $state.go("compose-edit", id);
  }
  
  function submitComment(){
    return topicsService.postComment(vm.topicId,vm.newComment).success(res=>vm.topicData = res);
  }
  
  appEvent.subscribe("editTopic", handleEditTopic, $scope);

}
})();