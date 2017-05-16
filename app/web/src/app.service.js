(function () {
  angular.module('app')
    .service('appService', appService);

  function appService(jwtHelper, $http, APP_CONST, $q, appEvent, $rootScope) {
    var vm = this;
    $rootScope.title = 'src.moe - POJO的个站';
    $rootScope.meta = 'POJO的个站和Blog。POJO,坐标上海,男,94年生,Web开发转读研,法语爱好者。';

    var service = {
      uploadImage: uploadImage,
      isAdmin: isAdmin,
      isUser: isUser,
      getCurrentUser: getCurrentUser,
      getNameRand: getNameRand,
      changeTitleAndMeta: changeTitleAndMeta,
      setTitleAndMeta: setTitleAndMeta
    };
    return service;

    function setTitleAndMeta(info) {
      $rootScope.title = info.title + ' - Villefranche - 自由城 - src.moe';
      $rootScope.meta = info.meta;
    }

    function uploadImage(img) {
      return $http.post('https://x.mouto.org/wb/x.php?up', img);
    }

    function isAdmin() {
      if (localStorage.getItem('juicy_token')) {
        var payload = jwtHelper.decodeToken(localStorage.getItem('juicy_token'));
        if (payload) {
          return payload.isAdmin;
        }
      }
      return false;
    }

    function getNameRand(id) {
      if (localStorage.getItem('juicy_ano_name')) {
        return localStorage.getItem('juicy_ano_name');
      } else {
        localStorage.setItem('juicy_ano_name', '阿卡林' + id);
      }
    }

    function isUser() {
      var token = localStorage.getItem('juicy_token');
      if (token) {
        var payload = jwtHelper.decodeToken(token);
        return !!payload;
      }
      return false;
    }

    function getCurrentUser() {
      var token = localStorage.getItem('juicy_token');
      if (token) {
        var payload = jwtHelper.decodeToken(token);
        return $http.get(APP_CONST.api + 'v1/users/' + payload.id);
      }
      return $q.all('');
    }

    function changeTitleAndMeta(info) {
      appEvent.publish('titleAndMetaVariation', info);
    }
  }
})();
