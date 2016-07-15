(function () {
  angular.module('app.modules')
  .service('topicsService', topicsService);

function topicsService($http, $state, $document, APP_CONST) {
  var service = {
    fetchAll: fetchAll,
    fetchByMonth: fetchByMonth,
    fetchBySkipAndLimit: fetchBySkipAndLimit,
    fetchAvailableMonths: fetchAvailableMonths,
    fetchOne: fetchOne,
    postTopic: postTopic,
    postComment:postComment
  };

  return service;

  function fetchAll() {
    return $http.get(APP_CONST.api + 'v1/topics&populate=tags');
  }

  function fetchBySkipAndLimit(skip, limit) {
    return $http.get(APP_CONST.api + 'v1/topics?sort=-createdAt&skip=' + skip + '&limit=' + limit + '&select=_id,title,featured,createdAt,summary,content,tags&populate=tags');
  }


  function fetchOne(id){
   return $http.get(APP_CONST.api + 'v1/topics?query={"_id":"'+id+'"}&populate=[{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]');
  }

  function fetchByMonth(yymm, duration) {
    return $http.get(APP_CONST.api + 'topics/yymm/' + yymm + '/duration/' + duration);
  }

  function fetchAvailableMonths() {
    return $http.get(APP_CONST.api + 'topics/months');
  }

  function postTopic(topic) {
    if (!topic._id) {
      return $http.post(APP_CONST.api + 'v1/topics', topic);
    } else {
      return $http.patch(APP_CONST.api + 'v1/topics/' + topic._id, topic);
    }
  }

  function postComment(id,comment) {
    return $http.post(APP_CONST.api + 'topic/'+id+'/comment', comment);
  }



}
})();