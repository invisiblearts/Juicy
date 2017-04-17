(function () {
  angular.module('app.modules')
    .controller('topicsDetailCtrl', topicsDetailCtrl);

  function topicsDetailCtrl($scope, $http, $state, $document, appEvent, appService, topicsService) {
    var vm = this;
    vm.topicData = {};
    vm.topicTitle = $state.params.title;
    vm.submitComment = submitComment;
    vm.isUser = appService.isUser();
    vm.login = login;

    init();

    /////////

    function init() {
      if (!vm.topicTitle) {
        $state.go("beats");
      } else if (new RegExp(".*[\u4e00-\u9fa5 ]+.*$", "g").test(vm.topicTitle)) {
        topicsService.fetchByTitle(vm.topicTitle).success(res=>vm.topicData = res[0]);
      } else {
        topicsService.fetchOne(vm.topicTitle).success(res=>vm.topicData = res[0]).error(res=>topicsService.fetchByTitle(vm.topicTitle).success(res=>vm.topicData = res[0]));
      }
    }

    function handleEditTopic(event, id) {
      $state.go("compose-edit", id);
    }

    function submitComment() {
      if (vm.newComment && vm.newComment.body && vm.newComment.body !== '') {
        return topicsService.postComment(vm.topicData._id, vm.newComment).success(res=>vm.topicData = res);
      }
    }


    function login() {
      $state.go("login");
    }

    appEvent.subscribe("editTopic", handleEditTopic, $scope);

  }
})();