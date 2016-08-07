(function() {
  angular.module('app.modules')
  .controller('beatsCtrl', beatsCtrl);

function beatsCtrl($scope, $http, $state, $document, appEvent, appService,tagsService, topicsService, jwtHelper, beatsService,angularGridInstance) {
  var vm = this;
  var beatsPerPage = 6;
  var paginationInitBeatsNum = 15;
  var paginationInit = true;
  vm.isAdmin=appService.isAdmin();

  vm.upload = upload;
  vm.submitBeat = submitBeat;
  vm.addTag = addTag;
  vm.clearCurrentBeat = clearCurrentBeat;
  vm.modifyTag = modifyTag;
  vm.deleteTag = deleteTag;
  vm.newComment= {
    
  };

  vm.newTag = {
    name: "Tag Name Goes Here",
    class: "blue"
  };
  vm.newBeat = {
    // time: 0,  to be populated in backend
    text: "",
    featured: false,
    safe: true,
    tags:[]
  };

  vm.login = login;
  //Temporarily treat vm.dataSource as a local datasource
  vm.customRefreshEnabled = false;
  vm.monthNeeded = [];
  vm.tabs = [];
  vm.lock = false;
  vm.selectedBeats = [];
  vm.currentSelectedTab = {};
  vm.jcSubNavSettings = [
    {
      type: 'toggle',
      title: 'Featured Only',
      value: false,
      event: 'toggleFeatured'
    },

    {
      type: 'toggle',
      title: 'Hide Selfie',
      value: true,
      event: 'toggleWeired'
    }
  ];

  // TODO MODERATE: comment and tag function to add in further releases
  vm.getBeatOfMonth = getBeatOfMonth;
  vm.scrollTop = scrollTop;
  vm.pushBeatsPaginated = pushBeatsPaginated;
  vm.submitComment = submitComment;
  vm.pageForCustomRefresh = 0;
  activate();
  ////////////////////////////////


  function pushBeatsPaginated() {
    var skipCount = vm.pageForCustomRefresh * beatsPerPage;
    if (paginationInit) {
      beatsPerPage = paginationInitBeatsNum;
    }
    if (!vm.lock) {
      vm.lock = true;
      beatsService.fetchBySkipAndLimit(skipCount, beatsPerPage).success(res => {
        if (res && res.length) {
          angular.forEach(res, r => {
              r.init = paginationInit;
              if (!vm.selectedBeats.beats) {
                vm.selectedBeats.beats = [];
              }
              vm.selectedBeats.beats.push(r);
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

  function scrollTop() {
    $document.scrollTop(0, 2000);
  }

  function modifyBeats(event, beats) {
    vm.newBeat = beats;
    if(vm.newBeat.image && vm.newBeat.image.length) {
      vm.newBeat.image = vm.newBeat.image.map(i=>i.replace('https://ww4', 'https://ws4'));
    }
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
      stateParam: {month: yearAndMonth}
    }
  }

  function clearCurrentBeat(){
    vm.newBeat = {
      // time: 0,  to be populated in backend
      text: "",
      featured: false,
      safe: true,
      tags:[]
    };

  }
  function activate() {
    vm.isUser = appService.isUser();
    topicsService.fetchBySkipAndLimit(0, 3).success(res=>vm.topicList = res);
    generatejcSubNavTabs().then(function (tabs) {
      vm.tabs = tabs;
      if ($state.params.month != null) {
        vm.customRefreshEnabled = false;
        getBeatOfMonth($state.params.month);
      } else {
        vm.currentSelectedTab = {
          title: 'Recent',
          state: 'beats'
        };
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
          stateParam: {month: yymm}
        });
      });
      return tabs;
    });
  }

  function switchTab(event, tab) {
    vm.currentSelectedTab = tab;
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

  function handleTopicSelected(event, title) {
    $state.go("topics-detail", title);
  }

  function login() {
    $state.go("login");
  }

  function submitBeat() {
    beatsService.postBeat(vm.newBeat);
  }


  function handleEditTopic(event, id) {
    $state.go("compose-edit", id);
  }

  function handleComment(event, content) {
    vm.newComment = {};
    vm.newComment.beat = content._id;
  }

  function upload($files, $event, $flow) {
    appService.uploadImage($flow.files[0].file)
      .success(data=>{
        if(!vm.newBeat.image){
          vm.newBeat.image = [];
        }
        vm.newBeat.image.push('https://ws4.sinaimg.cn/large/' + data.pid)
      });
  }

  function addTag(){
    tagsService.fetchByName(vm.newTag.name).success(res=>{
      if(!res[0] || !res[0]._id){
        tagsService.postTag(vm.newTag).success(res=>pushTag(res));
      }else{
        pushTag(res[0]);
      }});
  }

  function pushTag(tag){
    var present = false;
    if(vm.newBeat.tags == null){
      vm.newBeat.tags=[];
    }
    for(var i = 0 ; i < vm.newBeat.tags.length; i++) {
      present = vm.newBeat.tags[i]._id === tag._id;
      if (present) {
        vm.newBeat.tags[i] = tag;
        break;
      }
    }
    if(!present){
      vm.newBeat.tags.push(tag);
    }
    vm.newTag = {
      name: "Tag Name Goes Here",
      class: "blue"
    };
  }

  function modifyTag(tag){
    vm.newTag = angular.copy(tag);
  }

  function deleteTag(tag){
    tagsService.deleteOne(tag._id);
  }

  function submitComment(){
    var id = angular.copy(vm.newComment.beat);
    if(vm.newComment.body && vm.newComment.body!=='') {
      delete vm.newComment.beat;
      return beatsService.postComment(id, vm.newComment).success(res=>appEvent.publish('card_update_' + id, res));
    }
  }
  ///////////////////
  appEvent.subscribe('jcSubNavSectionSwitched', switchTab, $scope);
  appEvent.subscribe('modifyBeats', modifyBeats, $scope);
  appEvent.subscribe('deleteBeats', deleteBeats, $scope);
  appEvent.subscribe("topicSelected", handleTopicSelected, $scope);
  appEvent.subscribe("editTopic", handleEditTopic, $scope);
  appEvent.subscribe("comment", handleComment, $scope);


}
})();