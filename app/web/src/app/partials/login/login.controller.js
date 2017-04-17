(function () {
  angular.module('app.modules')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, $http, $state, $document, appEvent, jwtHelper, loginService, appService) {
    var vm = this;
    vm.loginOrReg = loginOrReg;
    vm.evict = evict;
    vm.userLogin = {
      username: "",
      password: ""
    };

    vm.currentUser = {};
    vm.updateUser = updateUser;

    vm.upload = upload;
    init();

    function init() {
      var userPromise = appService.getCurrentUser().then(res=>vm.currentUser = res.data);
    }

    function loginOrReg() {
      if (!vm.userLogin || !vm.userLogin.username || vm.userLogin.username === '' || !vm.userLogin.password || vm.userLogin.password === '') {
        return;
      }
      loginService.login(vm.userLogin).success(setToken)
        .error(res=>loginService.reg(vm.userLogin).success(setToken))
    }

    function setToken(token) {
      if (typeof token === "string") {
        localStorage.setItem('juicy_token', token)
      }
      init();
    }


    function upload($files, $event, $flow) {
      appService.uploadImage($flow.files[0].file)
        .success(data=>vm.currentUser.avatar = 'https://ws4.sinaimg.cn/large/' + data.pid);
    }

    function evict() {
      loginService.evict();
    }

    function updateUser() {
      loginService.updateUser(vm.currentUser);
    }
  }
})();