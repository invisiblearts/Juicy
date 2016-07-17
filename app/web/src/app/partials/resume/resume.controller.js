(function() {
  angular.module('app.modules')
  .controller('resumeCtrl', resumeCtrl);

function resumeCtrl($scope, $http, $state, $document, appEvent,appService, topicsService) {
  var vm = this;
  vm.topicData = {};
  vm.topicId = $state.params.id;
  vm.submitComment = submitComment;
  vm.isUser = appService.isUser();
  vm.login = login;

  init();

  /////////

  function init() {
    topicsService.findOneByStaticType('resume').success(res=>{
      if(!res[0]){
        $state.go('beats');
      }
      vm.topicData = res[0]
    });
  }

  function handleEditTopic(event, id) {
    $state.go("compose-edit", id);
  }

  function submitComment(){
    return topicsService.postComment(vm.topicId,vm.newComment).success(res=>vm.topicData = res);
  }


  function login() {
    $state.go("login");
  }

  appEvent.subscribe("editTopic", handleEditTopic, $scope);

}
})();