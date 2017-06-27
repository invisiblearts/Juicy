(function () {
  angular.module('app')
    .config(routeProvider);
  function routeProvider($stateProvider, $locationProvider, $urlRouterProvider,$provide) {
    $locationProvider.html5Mode({enabled: true});
    $locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise("404");


    $provide.decorator('$uiViewScroll', function ($delegate) {
      return function (uiViewElement) {
        jQuery('body').animate({
          scrollTop: 0
        }, 100);
      };
    });

    $stateProvider.state('tweets', {
      url: '/tweets',
      templateUrl: 'partials/beats/beats.view.html',
      controller: 'beatsCtrl',
      controllerAs: 'vm'
    }).state('tweets.specified', {
      url: '/month/:month',
      templateUrl: 'partials/beats/beats.view.html',
      controller: 'beatsCtrl',
      controllerAs: 'vm'
    }).state('compose', {
      url: '/compose',
      templateUrl: 'partials/compose/compose.view.html',
      controller: 'composeCtrl',
      controllerAs: 'vm'
    }).state('compose-edit', {
      url: '/compose/:id',
      templateUrl: 'partials/compose/compose.view.html',
      controller: 'composeCtrl',
      controllerAs: 'vm'
    }).state('login', {
      url: '/login',
      templateUrl: 'partials/login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    }).state('analysis', {
      url: '/analysis',
      templateUrl: 'partials/analysis/analysis.view.html',
      controller: 'analysisCtrl',
      controllerAs: 'vm'
    }).state('topics', {
      url: '/topics',
      templateUrl: 'partials/topics/topics.view.html',
      controller: 'topicsCtrl',
      controllerAs: 'vm'
    }).state('links', {
      url: '/links',
      templateUrl: 'partials/links/links.view.html',
      controller: 'linksCtrl',
      controllerAs: 'vm'
    }).state('topics-detail', {
      url: '/topics/:title',
      templateUrl: 'partials/topics/topics-detail.view.html',
      controller: 'topicsDetailCtrl',
      controllerAs: 'vm'
    }).state('baladeur', {
      url: '/baladeur',
      templateUrl: 'partials/baladeur/baladeur.view.html',
      controller: 'baladeurCtrl',
      controllerAs: 'vm'
    }).state('resume', {
      url: '/resume',
      templateUrl: 'partials/resume/resume.view.html',
      //controller: 'resumeCtrl',
      //controllerAs: 'vm'
    }).state('index', {
      url: '/',
      templateUrl: 'partials/resume/resume.view.html'
    }).state('404', {
      url: '/404',
      templateUrl: 'partials/pages/404.html'
    });

  }
})();
