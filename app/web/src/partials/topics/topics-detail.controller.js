(function () {
  angular.module('app.modules')
    .controller('topicsDetailCtrl', topicsDetailCtrl);

  function topicsDetailCtrl($scope, $http, $state, loginService, appEvent, appService, topicsService,$q) {
    var vm = this;
    vm.topicData = {};
    vm.topicTitle = $state.params.title;
    vm.userLogin = {
      username: "",
      password: ""
    };
    vm.submitComment = submitComment;
    vm.isUser = appService.isUser();
    vm.login = login;

    init();

    /////////

    function init() {
      vm.isUser = appService.isUser();
      appService.getCurrentUser().then(res=>vm.currentUser = res.data);
      if (!vm.topicTitle) {
        $state.go("topics");
      } else if (new RegExp(".*[\u4e00-\u9fa5 ]+.*$", "g").test(vm.topicTitle)) {
        topicsService.fetchByTitle(vm.topicTitle)
          .success(res=> {
            vm.topicData = res[0];
            vm.topicData.tagText = vm.topicData.tags.map(i=>i.name).join(',');
            if(!vm.topicData || !vm.topicData._id){
              $state.go('topics')
            }
          })
          .error(res=>$state.go('topics'));
      } else {
        topicsService.fetchOne(vm.topicTitle).success(res=>{
          vm.topicData = res[0];
          vm.topicData.tagText = vm.topicData.tags.map(i=>i.name).join(',');
          if(!vm.topicData || !vm.topicData._id){
            $state.go('topics')
          }
        }).error(res=>
          topicsService.fetchByTitle(vm.topicTitle)
            .success(res=>{
              vm.topicData = res[0];
              vm.topicData.tagText = vm.topicData.tags.map(i=>i.name).join(',');
              if(!vm.topicData || !vm.topicData._id){
                $state.go('topics')
              }
            })
            .error(res=>$state.go('topics')));
      }
    }

    function handleEditTopic(event, id) {
      $state.go("compose-edit", id);
    }

    function submitComment() {
      if(vm.currentUser && vm.currentUser._id){
        doComment(vm.currentUser);
      }else{
        doComment(vm.userLogin);
      }
    }
    
    function doComment(info){
      loginService.login(info)
        .success(setTokenAndPostComment)
        .error(res=>loginService.reg(info)
          .success(setTokenAndPostComment))
    }

    function setTokenAndPostComment(token){
      if (typeof token === "string") {
        localStorage.setItem('juicy_token', token)
      }
      appService.getCurrentUser().then(res=>{
        vm.currentUser = res.data;
        if (vm.newComment && vm.newComment.body && vm.newComment.body !== '') {
          return topicsService.postComment(vm.topicData._id, vm.newComment).success(res=>vm.topicData = res);
        }
      });
    }

    function login() {
      $state.go("login");
    }

    appEvent.subscribe("editTopic", handleEditTopic, $scope);

  }
})();