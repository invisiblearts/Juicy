'use strict';

angular.module('app').filter('breakFilter', breakFilter);
function breakFilter() {
  return function (input) {
    if (!input) return input;
    var output = input
    //replace possible line breaks.
    .replace(/(\r\n|\r|\n)/g, '<br/>')
    //replace tabs
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
    //replace spaces.
    .replace(/ /g, '&nbsp;');
    return output;
  };
}
angular.module('app').constant('APP_CONST', {
  title: 'Juicy',
  version: 'v2 alpha1',
  production: true,
  api: '/api/'
});

angular.module("app").factory('appEvent', ['$rootScope', function ($rootScope) {
  // private notification messages
  var _DATA_UPDATED_ = '_DATA_UPDATED_';
  /*
   * @name: publish
   * @description: 消息发布者，只用$emit冒泡进行消息发布的低能耗无污染方法
   * @param: {string=}: msg, 要发布的消息关键字，默认为'_DATA_UPDATED_'指数据更新
   * @param: {object=}: data，随消息一起传送的数据，默认为空
   * @example:
   * 		pubSubService.publish('config.itemAdded', {'id': getID()});
   * 	    更一般的形式是：
   *      pubSubService.publish();
   */
  var publish = function publish(msg, data) {
    msg = msg || _DATA_UPDATED_;
    data = data || {};
    $rootScope.$emit(msg, data);
  };
  /*
   * @name: subscribe
   * @description: 消息订阅者
   * @param: {function}: 回调函数，在订阅消息到来时执行
   * @param: {object=}: 控制器作用域，用以解绑定,默认为空
   * @param: {string=}: 消息关键字，默认为'_DATA_UPDATED_'指数据更新
   * @example:
   * 		pubSubService.subscribe(function(event, data) {
   *	    $scope.power = data.power;
   *		    $scope.mass = data.mass;
   *		},  $scope, 'data_change');
   *		更一般的形式是：
   *		pubSubService.subscribe(function(){});
   */
  var subscribe = function subscribe(msg, func, scope) {
    if (!angular.isFunction(func)) {
      console.log(msg + ": Needs a callback function");
      return;
    }
    msg = msg || _DATA_UPDATED_;
    var unbind = $rootScope.$on(msg, func);
    //可控的事件反绑定机制
    if (scope) {
      scope.$on('$destroy', unbind);
    }
  };

  // return the publicly accessible methods
  return {
    publish: publish,
    subscribe: subscribe
  };
}]);

httpConfig.$inject = ["$httpProvider", "jwtInterceptorProvider"];angular.module('app').config(httpConfig);

function httpConfig($httpProvider, jwtInterceptorProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  };
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  $httpProvider.interceptors.push('jwtInterceptor');
  jwtInterceptorProvider.tokenGetter = tokenGetter;

  function tokenGetter() {
    return localStorage.getItem('juicy_token');
  }
}

angular.module('app', ['ui.router', 'ui.materialize', 'app.modules', 'app.components']);

routeProvider.$inject = ["$stateProvider", "$urlRouterProvider"];angular.module('app').config(routeProvider);
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
  });
}

appService.$inject = ["jwtHelper", "$http"];angular.module('app').service('appService', appService);

function appService(jwtHelper, $http) {
  var service = {
    uploadImage: uploadImage,
    isAdmin: isAdmin
  };
  return service;

  function uploadImage(img) {
    return $http.post('http://x.mouto.org/wb/x.php?up', img);
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
}
angular.module('app.components', ['angularGrid', 'duScroll', 'infinite-scroll']);

angular.module('app.modules', ['angularGrid', 'duScroll', 'angular-jwt', 'ng-showdown', 'flow']);

jcCardContent.$inject = ["angularGridInstance"];angular.module('app.components').directive('jcCardContent', jcCardContent);

function jcCardContent(angularGridInstance) {
  var directive = {
    controller: cardContentCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/card/card-content.tmpl.html',
    scope: {},
    require: '^^jcCard',
    link: postLink,
    bindToController: true
  };
  return directive;

  function postLink(scope, element, attrs, cardCtrl) {
    scope.vm.content = cardCtrl.content;
    scope.vm.showDst = cardCtrl.showDst;
    scope.vm.utcCn = cardCtrl.utcCn;
    scope.vm.isAdmin = cardCtrl.isAdmin;
    scope.vm.hideProgress = cardCtrl.hideProgress;
    scope.vm.refreshInit();
  }

  function cardContentCtrl($scope, $filter) {
    var vm = this;
    vm.timeMessage = '';
    vm.refreshInit = refreshInit;
    ///////////////////////////

    function refreshInit() {
      if (!angular.isUndefined(angularGridInstance) && !angular.isUndefined(angularGridInstance.cards) && vm.content.init) {
        angularGridInstance.cards.refresh();
      }
    }

    function getTimeMessage(date) {
      var timeMessage = $filter('date')(new Date(date), 'yyyy-MM-dd HH:mm:ss', checkAndOutputUTC(date));
      if (vm.showDst) {
        timeMessage += checkAndOutputUTC(date) === '+0100' ? ' Winter Time' : ' Summer Time';
        ;
      }

      return timeMessage;
    }

    function checkAndOutputUTC(date) {
      //We've got summertime for French guys
      if (angular.isUndefined(date)) return;
      date = new Date(date);
      if (date > new Date(1427587200000) && date < new Date(1445731200000) || date > new Date(1396137600000) && date < new Date(1414281600000)) {
        return '+0200';
      } else if (vm.utcCn) {
        return '+0800';
      } else {
        return '+0100';
      }
    }

    var unset = $scope.$watch('vm.content.time', function handleTime(timestamp) {
      vm.timeMessage = getTimeMessage(timestamp);
      unset();
    });
  }
}

angular.module('app.components').directive('jcCardControl', jcCardControl);

function jcCardControl() {
  var directive = {
    controller: cardControlCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/card/card-control.tmpl.html',
    require: '^^jcCard',
    scope: {},
    link: postLink,
    bindToController: true
  };
  return directive;

  function postLink(scope, element, attrs, cardCtrl) {
    scope.cardCtrl = cardCtrl;
    scope.vm.content = cardCtrl.content;
  }

  function cardControlCtrl($scope, appEvent) {
    var vm = this;
    vm.deleteBeats = deleteBeats;
    vm.modifyBeats = modifyBeats;

    ////////////////////////////////

    function deleteBeats() {
      $scope.cardCtrl.deleted = true;
      appEvent.publish('deleteBeats', vm.content._id);
    }

    function modifyBeats() {
      appEvent.publish('modifyBeats', vm.content);
    }
  }
}

angular.module('app.components').directive('jcCard', jcCard);

function jcCard() {
  var directive = {
    controller: cardCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/card/card.tmpl.html',
    scope: {
      content: '=jcContent',
      showDst: '@jcShowDst',
      utcCn: '@jcShowUtcCn',
      hideProgress: '@jcHideProgress'
    },
    bindToController: true
  };
  return directive;

  function cardCtrl(APP_CONST, appService) {
    var vm = this;
    vm.deleted = false;
    vm.prod = APP_CONST.production;
    vm.isAdmin = appService.isAdmin();
  }
}

jcMasonryCards.$inject = ["$q"];angular.module('app.modules').directive('jcMasonryCards', jcMasonryCards);

function jcMasonryCards($q) {
  var directive = {
    controller: masonryCardsCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/masonry-cards/masonry-cards.view.html',
    scope: {
      data: '=jcData',
      initialCardNum: '@jcInitNum',
      newCardPerPage: '@jcRefreshNum',
      customRefresh: '=jcCustomRefresh',
      customRefreshEnabled: '=jcCustomRefreshEnabled'
    },
    bindToController: true
  };
  return directive;

  function masonryCardsCtrl($scope, $filter, angularGridInstance, appEvent) {
    var vm = this;
    // Defaults
    var initialCardNum = vm.initialCard ? parseInt(vm.initialCardNum, 10) : 15;
    var newCardPerPage = vm.newCardPerPage ? parseInt(vm.newCardPerPage, 10) : 6;
    var currentCard = 0;
    var displayedDataMirror = [];

    vm.displayedData = [];
    vm.loadMore = loadMore;
    vm.featuredOnly = false;
    vm.safeOnly = true;

    /////////////

    function handleChange() {
      if (vm.customRefreshEnabled) {
        vm.displayedDataMirror = vm.data;
        vm.displayedData = $filter('filter')(vm.displayedDataMirror, displayFilter);
      } else {
        handleRefreshDisabled();
      }
    }

    function handleRefreshDisabled() {
      var initPush = true;
      vm.displayedData = [];
      displayedDataMirror = [];
      currentCard = 0;
      pushData(initialCardNum, initPush);
    }

    function deleteData(event, time) {
      for (var i = 0; i < vm.displayedData.length; i++) {
        if (vm.displayedData[i].time === time) {
          vm.displayedData.splice(i, 1);
          currentCard--;
          return;
        }
      }
    }

    function displayFilter(beat) {
      if (beat.featured == null) {
        beat.featured = false;
      }
      if (beat.safe == null) {
        beat.safe = true;
      }

      //Check if we could pass the feature toggle restrict
      var showFeatured = !vm.featuredOnly || vm.featuredOnly && beat.featured;
      //Check if we could pass the mentle safe(lol) toggle restrict
      var showWeired = !vm.safeOnly || vm.safeOnly && beat.safe;
      return showFeatured && showWeired;
    }

    function pushData(number, initPush) {
      for (var i = 0; i < number; i++) {
        if (vm.data == null || vm.data[currentCard] == null) {
          return;
        }
        //Ensure correct number of cards displayed when $filter is off
        if (initPush) {
          vm.data[currentCard].init = true;
        }
        displayedDataMirror.push(vm.data[currentCard]);
        if (displayFilter(vm.data[currentCard])) {
          vm.displayedData.push(vm.data[currentCard]);
        } else {
          //Ensure Right Number Of Cards Added
          i--;
        }
        currentCard++;
      }
    }

    function loadMore() {
      if (vm.customRefreshEnabled) {
        $scope.$apply(vm.customRefresh());
      } else {
        pushData(newCardPerPage);
      }
    }

    function handleToggle(param) {
      return function handleCallback(event, display) {
        if (display != true) {
          display = false;
        }
        vm[param] = display;
        angularGridInstance.cards.refresh();
        pushData(newCardPerPage);
        vm.displayedData = $filter('filter')(displayedDataMirror, displayFilter);
      };
    }

    appEvent.subscribe('toggleFeatured', handleToggle('featuredOnly'), $scope);
    appEvent.subscribe('toggleWeired', handleToggle('safeOnly'), $scope);
    appEvent.subscribe('deleteData', deleteData, $scope);

    $scope.$watchCollection('vm.data', function () {
      // Recerive new monthly Data
      if (vm.data && vm.data.length) {
        handleChange();
      }
    }, true);

    $scope.$on('$repeatFinished', function (event, data) {
      angularGridInstance.cards.refresh();
    });
  }
}

resize.$inject = ["$window"];angular.module('app.components').directive('resize', resize);

function resize($window) {
  return function (scope, element) {
    var w = angular.element($window);
    var refreshWidth = function refreshWidth() {
      scope.winWidth = w.width();
      //   element.css('height', (w.height() -20) + 'px' );
    };
    w.bind('resize', function () {
      refreshWidth(); // when window size gets changed
    });
    refreshWidth(); // when page loads
    element.css('height', w.height() - 20 + 'px');
  };
}

jcNav.$inject = ["$state"];angular.module('app.components').directive('jcNav', jcNav);

function jcNav($state) {
  var directive = {
    controller: navCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/nav/nav.tmpl.html',
    bindToController: true
  };
  return directive;

  function navCtrl(jcNav, $scope, $filter, appEvent, APP_CONST) {
    var vm = this;
    vm.appTitle = APP_CONST.title;
    vm.appVersion = APP_CONST.version;
    vm.navs = $filter('orderBy')(jcNav.navConfig, 'order', true);
    vm.gotoState = gotoState;

    /////////////////////////

    function gotoState(state) {
      $state.go(state);
    }
  }
}

angular.module('app').provider('jcNav', jcNavProvider);

function jcNavProvider() {
  var navConfig = [];
  this.$get = function () {
    return {
      addMenu: addMenu,
      navConfig: navConfig
    };
  };

  //////////////////

  function addMenu(menus) {
    angular.forEach(menus, function (menu) {
      pushMenu(menu);
    });
  }

  function pushMenu(nav) {
    navConfig.push(nav);
  }
}

angular.module('app.components').directive('jcSubNavSettings', jcSubNavSettings);

function jcSubNavSettings() {
  var directive = {
    controller: subNavSettingsCtrl,
    controllerAs: 'vm',
    require: '^jcSubNav',
    link: postLink,
    templateUrl: 'components/sub-nav/sub-nav-settings.tmpl.html',
    bindToController: true
  };
  return directive;

  function postLink(scope, element, attrs, subNavCtrl) {
    scope.vm.settings = subNavCtrl.settings;
  }

  function subNavSettingsCtrl(appEvent) {
    var vm = this;
    vm.handleSettings = handleSettings;

    ///////////////////////////

    function handleSettings(setting) {
      appEvent.publish(setting.event, setting.value);
    }
  }
}

angular.module('app.components').directive('jcSubNavTabs', jcSubNavTabs);

function jcSubNavTabs() {
  var directive = {
    controller: subNavTabsCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/sub-nav/sub-nav-tabs.tmpl.html',
    require: '^jcSubNav',
    link: postLink,
    bindToController: true
  };
  return directive;

  function postLink(scope, element, attrs, subNavCtrl) {
    scope.subNavCtrl = subNavCtrl;
  }

  function subNavTabsCtrl($rootScope, $document, $state, $scope, appEvent) {
    var vm = this;

    vm.displaySection = displaySection;
    vm.displaySettings = false;

    ///////////////////////////

    function scrollTop() {
      $document.scrollTop(63.9, 2000);
    }

    function displaySection(tab) {
      scrollTop();
      $state.go(tab.state, tab.stateParam);
      appEvent.publish('jcSubNavSectionSwitched', tab);
    }
  }
}

angular.module('app.components').directive('jcSubNav', jcSubNav);

function jcSubNav() {
  var directive = {
    controller: subNavCtrl,
    controllerAs: 'vm',
    templateUrl: 'components/sub-nav/sub-nav.tmpl.html',
    scope: {
      sections: '=jcSections',
      active: '=jcActive',
      settings: '=jcSettings'
    },
    bindToController: true
  };
  return directive;

  function subNavCtrl($scope, appEvent) {
    var vm = this;
    vm.displaySettings = false;

    ///////////////////////////

    function toggleSettings(event, settings) {
      vm.displaySettings = !vm.displaySettings;
    }
  }
}

angular.module('app.components').directive('jcTopicCard', jcTopicCard);
function jcTopicCard() {
  var directive = {
    controller: TopicCardCtrl,
    controllerAs: 'vm',
    scope: {
      jcTopic: '=',
      jcTopicBrief: '=',
      jcTopicShare: '=',
      jcShadowDisabled: '='
    },
    templateUrl: 'components/topic-card/topic-card.view.html',
    bindToController: true
  };
  return directive;

  ////////

  function TopicCardCtrl($scope, $showdown, $location, appService, appEvent) {
    var vm = this;
    vm.selectTopic = selectTopic;
    vm.share = share;
    vm.editTopic = editTopic;
    vm.isAdmin = appService.isAdmin();

    init();

    ////////
    function init() {

      if (vm.jcTopic !== undefined) {
        if (!vm.jcTopicBrief) {
          vm.jcTopic.html = $showdown.makeHtml(vm.jcTopic.content);
        }
      }
    }

    function selectTopic(id) {
      appEvent.publish('topicSelected', { id: id });
    }

    function editTopic(id) {
      appEvent.publish('editTopic', { id: id });
    }

    function share() {
      vm.nowUrl = 'https://src.moe/#' + $location.url();
      (function (s, d, e) {
        try {} catch (e) {}
        var f = 'http://v.t.sina.com.cn/share/share.php?',
            u = $scope.nowUrl,
            p = ['url=', e(u), '&title=', e(vm.jcTopic.title), '&pic=', e(vm.jcTopic.thumbnail)].join('');

        function a() {
          if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (s.width - 620) / 2, ',top=', (s.height - 450) / 2].join(''))) u.href = [f, p].join('');
        }

        if (/Firefox/.test(navigator.userAgent)) {
          setTimeout(a, 0);
        } else {
          a();
        }
      })(screen, document, encodeURIComponent);
    }

    $scope.$watch('vm.jcTopic', function () {
      // Recerive new monthly Data
      if (vm.jcTopic) {
        init();
      }
    }, true);
  }
}

angular.module('app.modules').controller('aboutCtrl', aboutCtrl);

function aboutCtrl() {
  var vm = this;
  vm.aboutData = [{
    title: 'Road to V2',
    time: 1456751208000,
    text: 'TODO:Build up a compiling workflow with Gulp + Browserify\nTODO:Comment and tag function to add in further releases \nTODO:Music section and Anime wallpapers switch\nTODO:(V3)Analysis module to add in further releases(optional)\nTODO:(V3)Unit Tests\nTODO:(V3+)Angular 2',
    featured: true
  }, {
    title: 'v2 alpha2',
    time: 1467907913966,
    text: 'Redis Cache , Links module',
    featured: true
  }, {
    title: 'v2 alpha1',
    time: 1467733803777,
    text: 'Image Uploading , Beats and Topics editing , bug fixes',
    featured: true
  }, {
    title: 'v2 alpha0',
    time: 1467649952611,
    text: 'Topic Modules with Markdown , ExpressJS Backend and UserLogin',
    featured: false
  }, {
    title: 'AngularJS Libs',
    time: 1456420305000,
    text: 'Modified Angular-materialize(including Materialize)\nModified Angular-grid by s-yadav (https://github.com/s-yadav/angulargrid)',
    featured: false
  }, {
    title: 'About Me',
    time: 1456420305000,
    text: 'Author : POJOa\nSite : http://src.moe/',
    featured: false
  }, {
    title: 'v1.5',
    time: 1458114983000,
    text: 'Multiple Bug Fixes For Recent Tab',
    featured: false
  }, {
    title: 'v1.4.2',
    time: 1458012771000,
    text: 'Ready For Express Backend\nAdded Recent Column\nThe Filter In Recent Column Currently Won\'t Work',
    featured: false
  }, {
    title: 'v1.4.1',
    time: 1457162347000,
    text: 'Initialization of Compose Module',
    featured: false
  }, {
    title: 'Stable Release v1.4 (Nozomi)',
    time: 1456751208000,
    text: 'Optimized performance',
    featured: true
  }, {
    title: 'v1.4 RC1 2016.02.28',
    time: 1456675603000,
    text: 'Nozomi is a Stable Version Milestone , from then I\'ll create a backend in express for it.\nOptimized Documentation.\nRenewed Card Style\nRefractor and Added Navbar Order\nRefresh Policy Change',
    featured: false
  }, {
    title: 'v1.3 2016.02.25',
    time: 1456420305000,
    text: 'Heavy Refractor of Card/Cards View and components\nUpdated angular-grid\nSolved various tiny bugs\n',
    featured: false
  }, {
    title: 'v1.2 2016.02.24',
    time: 1456243200000,
    text: 'Refractor jcSubNav\nEnhancement of Picture Displaying\nDisabled Slider (will be taken into account after next major release)\nAdded App Drawer For Mobile Devices\n'
  }, {
    title: 'v1.1 2016.02.23',
    time: 1456156800000,
    text: 'Added Navbar Customize Configuration Provider\nAdded Event Service.\nFixed (and disabled) Card Control.\nFixed Navbar Bug , added version badge.\nMinimalized data for Github.'
  }, {
    title: 'Release v1 2016.02.13',
    time: 1455292800000,
    text: 'Adjust Navbar Style.\nAdded Loading Bar.\nSpecified Feature Cards.\n',
    featured: true
  }, {
    title: 'Pre-release 2016.02.12',
    time: 1455206400000,
    text: 'Fixed height issue.'
  }, {
    title: 'v0.4 2016.02.11',
    time: 1455120000000,
    text: 'Unlimited Refreshing! Featured Filter!!'
  }, {
    title: 'v0.3 2016.02.10',
    time: 1455033600000,
    text: 'Added Cascade Displaying , switched to UI-Router'
  }, {
    title: 'v0.2 2016.02.09',
    time: 1454947200000,
    text: 'Built Project Skeleton , added cascade displaying'
  }, {
    title: 'v0.1 2016.02.08',
    time: 1454860800000,
    text: 'Simplified JSON structure'
  }];
}

navConfig.$inject = ["jcNavProvider"];angular.module('app').config(navConfig);

function navConfig(jcNavProvider) {
  jcNavProvider.$get().addMenu([{ title: 'Logs', state: 'about', order: 3 }]);
}

beatsCtrl.$inject = ["$scope", "$http", "$state", "$document", "appEvent", "appService", "topicsService", "jwtHelper", "beatsService"];angular.module('app.modules').controller('beatsCtrl', beatsCtrl);

function beatsCtrl($scope, $http, $state, $document, appEvent, appService, topicsService, jwtHelper, beatsService) {
  var vm = this;
  var beatsPerPage = 6;
  var paginationInitBeatsNum = 15;
  var paginationInit = true;
  vm.upload = upload;
  vm.submitBeat = submitBeat;
  vm.newBeat = {
    // time: 0,  to be populated in backend
    text: "",
    featured: false,
    safe: true
  };

  //Temporarily treat vm.dataSource as a local datasource
  vm.customRefreshEnabled = false;
  vm.monthNeeded = [];
  vm.tabs = [];
  vm.lock = false;
  vm.selectedBeats = [];
  vm.currentSelectedTab = {};
  vm.jcSubNavSettings = [{
    type: 'toggle',
    title: 'Featured Only',
    value: false,
    event: 'toggleFeatured'
  }, {
    type: 'toggle',
    title: 'Hide Selfie',
    value: true,
    event: 'toggleWeired'
  }];

  // TODO MODERATE: comment and tag function to add in further releases
  vm.getBeatOfMonth = getBeatOfMonth;
  vm.scrollTop = scrollTop;
  vm.pushBeatsPaginated = pushBeatsPaginated;
  vm.pageForCustomRefresh = 0;
  activate();
  ////////////////////////////////

  function deleteImages() {
    vm.newBeat.images;
  }

  function pushBeatsPaginated() {
    var skipCount = vm.pageForCustomRefresh * beatsPerPage;
    if (paginationInit) {
      beatsPerPage = paginationInitBeatsNum;
    }
    if (!vm.lock) {
      vm.lock = true;
      beatsService.fetchBySkipAndLimit(skipCount, beatsPerPage).success(function (res) {
        if (res && res.length) {
          angular.forEach(res, function (r) {
            r.init = paginationInit;
            if (!vm.selectedBeats.beats) {
              vm.selectedBeats.beats = [];
            }
            vm.selectedBeats.beats.push(r);
          });
          vm.pageForCustomRefresh++;
          vm.lock = false;
        } else {
          vm.lock = true;
        }
        paginationInit = false;
      });
    }
  }

  function scrollTop() {
    $document.scrollTop(0, 2000);
  }

  function modifyBeats(event, beats) {
    vm.newBeat = beats;
  }

  function deleteBeats(event, id) {
    beatsService.deleteOne(id);
  }

  function getBeatOfMonth(month) {
    vm.currentSelectedMonth = month;
    vm.currentSelectedTab = getTabByMonth(month);
    return beatsService.fetchByMonth(month, 1).success(function (res) {
      vm.selectedBeats = res;
    });
  }

  function getTabByMonth(yearAndMonth) {
    return {
      title: getNavDateLabel(yearAndMonth),
      state: 'beats.specified',
      stateParam: { month: yearAndMonth }
    };
  }

  function activate() {
    topicsService.fetchBySkipAndLimit(0, 3).success(function (res) {
      return vm.topicList = res;
    });
    generatejcSubNavTabs().then(function (tabs) {
      vm.tabs = tabs;
      if ($state.params.month != null) {
        vm.customRefreshEnabled = false;
        getBeatOfMonth($state.params.month);
      } else {
        vm.customRefreshEnabled = true;
        pushBeatsPaginated();
      }
    });
  }

  function generatejcSubNavTabs() {
    var tabs = [{
      title: 'Recent',
      state: 'beats'
    }];
    return beatsService.fetchAvailableMonths().then(function (res) {
      angular.forEach(res.data, function (yymm) {
        tabs.push({
          title: getNavDateLabel(yymm),
          state: 'beats.specified',
          stateParam: { month: yymm }
        });
      });
      return tabs;
    });
  }

  function switchTab(event, tab) {
    vm.lock = false;
    if (tab.stateParam && tab.stateParam.month) {
      vm.selectedBeats = [];
      getBeatOfMonth(tab.stateParam.month);
      vm.customRefreshEnabled = false;
    } else {
      vm.selectedBeats = [];
      vm.pageForCustomRefresh = 0;
      vm.customRefreshEnabled = true;
      pushBeatsPaginated();
    }
  }

  function getNavDateLabel(yearAndMonth) {
    var year = yearAndMonth.substring(0, 2);
    var month = yearAndMonth.substring(2, 4);
    return month + '/' + year;
  }

  /*function insertIntoDB(){
   $http.get('data/data.json').then(function(data){
   var dd = data.data;
   angular.forEach(dd,function(d){
   var beats = d.beats;
   angular.forEach(beats,function(b){
   b.time = new Date(b.time*1000);
   composeService.postBeat(b);
   });
   });
   })
   }*/

  function handleTopicSelected(event, id) {
    $state.go("topics-detail", id);
  }

  function submitBeat() {
    beatsService.postBeat(vm.newBeat);
  }

  function handleEditTopic(event, id) {
    $state.go("compose-edit", id);
  }

  function upload($files, $event, $flow) {
    appService.uploadImage($flow.files[0].file).success(function (data) {
      return vm.newBeat.image.push('http://ww4.sinaimg.cn/large/' + data.pid);
    });
  }

  ///////////////////
  appEvent.subscribe('jcSubNavSectionSwitched', switchTab, $scope);
  appEvent.subscribe('modifyBeats', modifyBeats, $scope);
  appEvent.subscribe('deleteBeats', deleteBeats, $scope);
  appEvent.subscribe("topicSelected", handleTopicSelected, $scope);
  appEvent.subscribe("editTopic", handleEditTopic, $scope);
}

beatsService.$inject = ["$http", "$state", "$document", "APP_CONST"];angular.module('app.modules').service('beatsService', beatsService);

function beatsService($http, $state, $document, APP_CONST) {
  var service = {
    fetchAll: fetchAll,
    fetchByMonth: fetchByMonth,
    fetchBySkipAndLimit: fetchBySkipAndLimit,
    fetchAvailableMonths: fetchAvailableMonths,
    deleteOne: deleteOne,
    postBeat: postBeat
  };
  return service;

  function fetchAll() {
    return $http.get(APP_CONST.api + 'v1/beats');
  }

  function deleteOne(id) {
    return $http.delete(APP_CONST.api + 'v1/beats/' + id);
  }

  function fetchBySkipAndLimit(skip, limit) {
    return $http.get(APP_CONST.api + 'v1/beats?sort=-time&skip=' + skip + '&limit=' + limit);
  }

  function fetchByMonth(yymm, duration) {
    return $http.get(APP_CONST.api + 'beats/yymm/' + yymm + '/duration/' + duration);
  }

  function fetchAvailableMonths() {
    return $http.get(APP_CONST.api + 'beats/months');
  }

  function postBeat(beat) {
    if (!beat._id) {
      return $http.post(APP_CONST.api + 'v1/beats', beat);
    } else {
      return $http.patch(APP_CONST.api + 'v1/beats/' + beat._id, beat);
    }
  }
}

composeCtrl.$inject = ["$scope", "$http", "$state", "$document", "appEvent", "appService", "topicsService"];angular.module('app.modules').controller('composeCtrl', composeCtrl);

function composeCtrl($scope, $http, $state, $document, appEvent, appService, topicsService) {
  var vm = this;
  vm.submitTopic = submitTopic;
  vm.upload = upload;
  vm.topicId = $state.params.id;

  vm.newTopic = {
    // time: 0,  to be populated in backend
    title: "Topic Title Here",
    content: "",
    featured: false
  };

  init();
  /////////

  function init() {
    if (vm.topicId) {
      topicsService.fetchOne(vm.topicId).success(function (res) {
        return vm.newTopic = res;
      });
    }
  }

  function submitTopic() {
    topicsService.postTopic(vm.newTopic);
  }

  function upload($files, $event, $flow) {
    appService.uploadImage($flow.files[0].file).success(function (data) {
      return vm.newTopic.content += '![image](http://ww4.sinaimg.cn/large/' + data.pid + ')';
    });
  }
}

navConfig.$inject = ["jcNavProvider", "appServiceProvider"];angular.module('app').config(navConfig);

function navConfig(jcNavProvider, appServiceProvider) {
  if (appServiceProvider.$get().isAdmin()) {
    jcNavProvider.$get().addMenu([{ title: 'Compose', state: 'compose', order: 1 }]);
  }
}

(function () {

  linksCtrl.$inject = ["$scope", "$http", "$state", "$window", "$document", "appEvent", "appService", "linksService"];
  angular.module('app.modules').controller('linksCtrl', linksCtrl);

  /*@ngInject*/
  function linksCtrl($scope, $http, $state, $window, $document, appEvent, appService, linksService) {
    var vm = this;
    vm.upload = upload;
    vm.open = open;
    vm.submit = submit;
    vm.modify = modify;
    vm.del = del;
    vm.isAdmin = false;
    vm.links = [];
    vm.newLink = {
      title: "New Link Title",
      description: "Site Description",
      img: "Image URL",
      alias: "Owner's Nickname",
      color: "Experimental Tag Color Picker",
      href: "Link Goes Here"
    };
    init();
    /////////

    function init() {
      vm.isAdmin = appService.isAdmin();
      linksService.fetchAll().success(function (res) {
        return vm.links = res;
      });
    }

    function upload($files, $event, $flow) {
      appService.uploadImage($flow.files[0].file).success(function (data) {
        return vm.newLink.img = 'http://ww4.sinaimg.cn/large/' + data.pid;
      });
    }

    function open(href) {
      $window.open(href);
    }

    function submit() {
      linksService.postLink(vm.newLink);
    }

    function modify(link) {
      vm.newLink = link;
    }

    function del(link) {
      linksService.deleteOne(link._id);
    }
  }
})();
(function () {

  navConfig.$inject = ["jcNavProvider", "appServiceProvider"];
  angular.module('app').config(navConfig);

  /*@ngInject*/
  function navConfig(jcNavProvider, appServiceProvider) {
    if (appServiceProvider.$get().isAdmin()) {
      jcNavProvider.$get().addMenu([{ title: 'Idols!', state: 'links', order: 8 }]);
    }
  }
})();
(function () {

  linksService.$inject = ["$http", "$state", "$document", "APP_CONST"];
  angular.module('app.modules').service('linksService', linksService);

  function linksService($http, $state, $document, APP_CONST) {
    var service = {
      fetchAll: fetchAll,
      fetchBySkipAndLimit: fetchBySkipAndLimit,
      deleteOne: deleteOne,
      postLink: postLink
    };

    return service;

    function fetchAll() {
      return $http.get(APP_CONST.api + 'v1/links');
    }

    function deleteOne(id) {
      return $http.delete(APP_CONST.api + 'v1/links/' + id);
    }

    function fetchBySkipAndLimit(skip, limit) {
      return $http.get(APP_CONST.api + 'v1/links?sort=-time&skip=' + skip + '&limit=' + limit);
    }

    function postLink(link) {
      if (!link._id) {
        return $http.post(APP_CONST.api + 'v1/links', link);
      } else {
        return $http.patch(APP_CONST.api + 'v1/links/' + link._id, link);
      }
    }
  }
})();

loginCtrl.$inject = ["$scope", "$http", "$state", "$document", "appEvent", "loginService"];angular.module('app.modules').controller('loginCtrl', loginCtrl);

function loginCtrl($scope, $http, $state, $document, appEvent, loginService) {
  var vm = this;
  vm.loginOrReg = loginOrReg;
  vm.evict = evict;
  vm.userLogin = {
    username: "",
    password: ""
  };

  function loginOrReg() {
    loginService.login(vm.userLogin).success(function (token) {
      if (token !== {}) {
        localStorage.setItem('juicy_token', token);
      }
    }).error(function (res) {
      return loginService.reg(vm.userLogin).success(function (token) {
        return localStorage.setItem('juicy_token', token);
      });
    });
  }

  function evict() {
    loginService.evict();
  }
}

navConfig.$inject = ["jcNavProvider", "appServiceProvider"];angular.module('app').config(navConfig);

function navConfig(jcNavProvider, appServiceProvider) {
  if (appServiceProvider.$get().isAdmin()) {
    jcNavProvider.$get().addMenu([{ title: 'Login', state: 'login', order: 4 }]);
  }
}

loginService.$inject = ["$http", "$state", "$document", "APP_CONST"];angular.module('app.modules').service('loginService', loginService);

function loginService($http, $state, $document, APP_CONST) {
  var service = {
    login: login,
    reg: reg,
    evict: evict
  };
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

  function evict() {
    return $http.get(APP_CONST.api + 'evictCache');
  }
}

topicsDetailCtrl.$inject = ["$scope", "$http", "$state", "$document", "appEvent", "topicsService"];angular.module('app.modules').controller('topicsDetailCtrl', topicsDetailCtrl);

function topicsDetailCtrl($scope, $http, $state, $document, appEvent, topicsService) {
  var vm = this;
  vm.topicData = {};
  vm.topicId = $state.params.id;

  init();

  /////////

  function init() {
    if (!vm.topicId) {
      $state.go("beats");
    }
    topicsService.fetchOne(vm.topicId).success(function (res) {
      return vm.topicData = res;
    });
  }

  function handleEditTopic(event, id) {
    $state.go("compose-edit", id);
  }

  appEvent.subscribe("editTopic", handleEditTopic, $scope);
}

topicsCtrl.$inject = ["$scope", "$http", "$state", "$document", "appEvent", "topicsService"];angular.module('app.modules').controller('topicsCtrl', topicsCtrl);

function topicsCtrl($scope, $http, $state, $document, appEvent, topicsService) {
  var vm = this;
  vm.topicList = [];
  vm.start = 0;
  vm.reachedEnd = false;
  vm.lock = false;
  vm.loadMore = loadMore;
  vm.pageForCustomRefresh = 0;
  var paginationInit = true;
  var paginationInitBeatsNum = 3;
  var beatsPerPage = 3;
  // init();

  /////////

  function loadMore() {
    pushBeatsPaginated();
  }

  function pushBeatsPaginated() {
    var skipCount = vm.pageForCustomRefresh * beatsPerPage;
    if (paginationInit) {
      beatsPerPage = paginationInitBeatsNum;
    }
    if (!vm.lock) {
      vm.lock = true;
      topicsService.fetchBySkipAndLimit(skipCount, beatsPerPage).success(function (res) {
        if (res && res.length) {
          angular.forEach(res, function (r) {
            r.init = paginationInit;
            if (!vm.topicList) {
              vm.topicList = [];
            }
            vm.topicList.push(r);
          });
          vm.pageForCustomRefresh++;
          vm.lock = false;
        } else {
          vm.lock = true;
        }
        paginationInit = false;
      });
    }
  }

  function handleTopicSelected(event, id) {
    $state.go("topics-detail", id);
  }

  function handleEditTopic(event, id) {
    $state.go("compose-edit", id);
  }

  appEvent.subscribe("topicSelected", handleTopicSelected, $scope);
  appEvent.subscribe("editTopic", handleEditTopic, $scope);
}

navConfig.$inject = ["jcNavProvider"];angular.module('app').config(navConfig);

function navConfig(jcNavProvider) {
  jcNavProvider.$get().addMenu([{ title: 'Topics', state: 'topics', order: 5 }]);
}

topicsService.$inject = ["$http", "$state", "$document", "APP_CONST"];angular.module('app.modules').service('topicsService', topicsService);

function topicsService($http, $state, $document, APP_CONST) {
  var service = {
    fetchAll: fetchAll,
    fetchByMonth: fetchByMonth,
    fetchBySkipAndLimit: fetchBySkipAndLimit,
    fetchAvailableMonths: fetchAvailableMonths,
    fetchOne: fetchOne,
    postTopic: postTopic
  };

  return service;

  function fetchAll() {
    return $http.get(APP_CONST.api + 'v1/topics');
  }

  function fetchBySkipAndLimit(skip, limit) {
    return $http.get(APP_CONST.api + 'v1/topics?sort=-createdAt&skip=' + skip + '&limit=' + limit + '&select=-content');
  }

  /*
   function fetchOne(id){
   return $http.get(APP_CONST.api + 'v1/topics?query={"_id":"'+id+'"}');
   }
   */
  function fetchOne(id) {
    return $http.get(APP_CONST.api + 'v1/topics/' + id);
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
}