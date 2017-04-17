(function () {

  angular.module('app.modules')
    .service('tagsService', tagsService);

  function tagsService($http, $state, $document, APP_CONST) {
    var service = {
      fetchAll: fetchAll,
      fetchByName: fetchByName,
      deleteOne: deleteOne,
      postTag: postTag,
      fetchById: fetchById
    };

    return service;

    function fetchAll() {
      return $http.get(APP_CONST.api + 'v1/tags');
    }

    function deleteOne(id) {
      return $http.delete(APP_CONST.api + 'v1/tags/' + id);
    }

    function fetchByName(name) {
      return $http.get(APP_CONST.api + 'v1/tags?query={"name":"' + name + '"}');
    }


    function fetchById(id) {
      return $http.get(APP_CONST.api + 'v1/tags/' + id);
    }

    function postTag(tag) {
      if (!tag._id) {
        return $http.post(APP_CONST.api + 'v1/tags', tag);
      } else {
        return $http.patch(APP_CONST.api + 'v1/tags/' + tag._id, tag);
      }
    }


  }
})();