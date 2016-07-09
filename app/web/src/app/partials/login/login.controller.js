(function () {
  angular.module('app.modules')
  .controller('loginCtrl', loginCtrl);

function loginCtrl($scope, $http, $state, $document, appEvent, loginService) {
  var vm = this;
  vm.loginOrReg = loginOrReg;
  vm.evict = evict;
  vm.userLogin = {
    username: "",
    password: ""
  };

  function loginOrReg() {
    loginService.login(vm.userLogin).success(setToken)
        .error(res=>loginService.reg(vm.userLogin).success(setToken))
  }

  function setToken(token){
    if (typeof token === "string") {
      localStorage.setItem('juicy_token', token)
    }
  }

  function evict() {
    loginService.evict();
  }
}
})();