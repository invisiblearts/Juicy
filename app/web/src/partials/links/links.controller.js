(function () {

  angular.module('app.modules')
    .controller('linksCtrl', linksCtrl);

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
    vm.animateElementIn = animateElementIn;
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
      linksService.fetchAll().success(res=>vm.links = res);
    }

    function animateElementIn($el) {
      $el.removeClass('not-visible');
      $el.addClass('animated fadeInUp');
    };

    function upload($files, $event, $flow) {
      appService.uploadImage($flow.files[0].file)
        .success(data=>vm.newLink.img = 'https://ws4.sinaimg.cn/large/' + data.pid);
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