(function () {
  angular.module('app.modules')
    .service('loginService', loginService);

  function loginService($http, $state, $document, APP_CONST) {
    var service = {
      login: login,
      reg: reg,
      evict: evict,
      updateUser: updateUser
    }
    return service;

    function login(userLogin) {
      return $http({
        url: APP_CONST.api + 'user/login',
        dataType: 'json',
        method: 'POST',
        data: userLogin,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    function reg(userLogin) {
      return $http({
        url: APP_CONST.api + 'user/reg',
        dataType: 'json',
        method: 'POST',
        data: userLogin,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    function updateUser(u) {
      return $http.patch(APP_CONST.api + 'v1/users/' + u._id, u);
    }

    function evict() {
      return $http.get(APP_CONST.api + 'evictCache');
    }
  }
})();