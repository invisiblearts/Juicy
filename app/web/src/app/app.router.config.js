(function() {
  angular.module('app')
  .config(routeProvider);
function routeProvider($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("beats");

  $stateProvider.state('beats', {
    url: '/beats',
    templateUrl: 'partials/beats/beats.view.html',
    controller: 'beatsCtrl',
    controllerAs: 'vm'
  }).state('beats.specified', {
    url: '/month/:month',
    templateUrl: 'partials/beats/beats.view.html',
    controller: 'beatsCtrl',
    controllerAs: 'vm'
  }).state('about', {
    url: '/about',
    templateUrl: 'partials/about/about.view.html',
    controller: 'aboutCtrl',
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
    url: '/topics/:id',
    templateUrl: 'partials/topics/topics-detail.view.html',
    controller: 'topicsDetailCtrl',
    controllerAs: 'vm'
  }).state('baladeur', {
    url: '/baladeur',
    templateUrl: 'partials/baladeur/baladeur.view.html',
    controller: 'baladeurCtrl',
    controllerAs: 'vm'
  });

}
})();