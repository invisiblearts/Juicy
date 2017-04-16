(function() {
  angular.module('app')
  .service('appService', appService);

function appService(jwtHelper, $http,APP_CONST,$q) {
  var service = {
    uploadImage: uploadImage,
    isAdmin: isAdmin,
    isUser: isUser,
    getCurrentUser:getCurrentUser,
    getNameRand:getNameRand
  };
  return service;

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
    }else{
      localStorage.setItem('juicy_ano_name','阿卡林'+id);
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

  function getCurrentUser(){
    var token = localStorage.getItem('juicy_token');
    if(token) {
      var payload = jwtHelper.decodeToken(token);
      return $http.get(APP_CONST.api + 'v1/users/' + payload.id);
    }
    return $q.all('');
  }

}
})();
