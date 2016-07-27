(function() {
  angular.module('app.modules')
  .controller('composeCtrl', composeCtrl);

function composeCtrl($scope, $http, $state, $document, appEvent, appService, topicsService, tagsService) {
  var vm = this;
  vm.submitTopic = submitTopic;
  vm.upload = upload;
  vm.addTag = addTag;

  vm.modifyTag = modifyTag;
  vm.deleteTag = deleteTag;

  vm.topicId = $state.params.id;
  vm.newTopic = {
    // time: 0,  to be populated in backend
    title: "Topic Title Here",
    content: "",
    featured: false,
    tags:[]
  };
  
  vm.newTag = {
    name: "Tag Name Goes Here",
    class: "blue"
  };
  
  init();
  /////////

  function init() {
    if (vm.topicId) {
      topicsService.fetchOne(vm.topicId).success(res=>vm.newTopic = res[0]);
    }
  }

  function submitTopic() {
    topicsService.postTopic(vm.newTopic);
  }

  function upload($files, $event, $flow) {
    console.log($flow.files)
    appService.uploadImage($flow.files[$flow.files.length-1].file)
      .success(data=>vm.newTopic.content += ('![image](https://ws4.sinaimg.cn/large/' + data.pid + ')'));
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
    if(vm.newTopic.tags == null){
      vm.newTopic.tags=[];
    }
    for(var i = 0 ; i < vm.newTopic.tags.length; i++) {
      present = vm.newTopic.tags[i]._id === tag._id;
      if (present) {
        vm.newTopic.tags[i] = tag;
        break;
      }
    }
    if(!present){
      vm.newTopic.tags.push(tag);
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
  
}
})();