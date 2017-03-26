
(function() {

  angular.module("app.components")
    .directive("lightboxed", lightboxed);

  function lightboxed($timeout) {
    var directive = {
      link: postLink
    };
    return directive;

    function postLink(scope, element, attrs){
      $timeout(function () {
        element.nivoLightbox();
      });
    }

  }
})();