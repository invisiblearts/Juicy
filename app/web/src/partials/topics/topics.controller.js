(function () {
  angular.module('app.modules')
    .controller('topicsCtrl', topicsCtrl);
  /*@ngInject*/
  function topicsCtrl($scope, $http, $state, $document, appEvent, topicsService) {
    var vm = this;
    vm.loading = 'loading';
    vm.topicList = [];
    vm.start = 0;
    vm.reachedEnd = false;
    vm.lock = false;
    vm.loadMore = loadMore;
    vm.pageForCustomRefresh = 0;
    vm.animateElementIn = animateElementIn;
    vm.animateElementOut = animateElementOut;

    var paginationInit = true;
    var paginationInitTopicsNum = 2;
    var topicsPerPage = 1;
    //init();

    /////////
    function animateElementIn($el) {
      $el.removeClass('not-visible');
      $el.addClass('animated fadeInUp');
    };


    function animateElementOut($el) {
      $el.addClass('not-visible');
      $el.removeClass('animated fadeInUp');
    };


    function loadMore() {
      pushTopicsPaginated();
    }

    function pushTopicsPaginated() {
      var skipCount = vm.pageForCustomRefresh * topicsPerPage;
      if (paginationInit) {
        topicsPerPage = paginationInitTopicsNum;
      }
      if (!vm.lock) {
        vm.lock = true;
        topicsService.fetchBySkipAndLimit(skipCount, topicsPerPage).success(res=> {
          if (res && res.length) {
            angular.forEach(res, r => {
                r.init = paginationInit;
                if (!vm.topicList) {
                  vm.topicList = [];
                }
                vm.topicList.push(r);
              }
            );
            vm.pageForCustomRefresh++;
            vm.lock = false;
          } else {
            vm.lock = true;
          }
          paginationInit = false;
        })
      }
    }

    function handleTopicSelected(event, title) {
      $state.go("topics-detail", title);
    }


    function handleEditTopic(event, id) {
      $state.go("compose-edit", id);
    }



    appEvent.subscribe("topicSelected", handleTopicSelected, $scope);
    appEvent.subscribe("editTopic", handleEditTopic, $scope);

  }
})();