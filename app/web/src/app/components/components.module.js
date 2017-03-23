(function() {
  angular.module('app.components', ['angularGrid', 'duScroll', 'infinite-scroll'])
    .directive("sticky", ["$timeout", function($timeout){
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {

          $timeout(function(){
            var nav = element.find("nav");

            var top_spacing = 0;
            var waypoint_offset = 0;

            element.waypoint({
              handler: function(event, direction) {

                if (direction == 'down') {
                  if (matchMedia('only screen and (min-width: 1000px)').matches) {
                    element.css({ 'height':nav.outerHeight() });
                    nav.stop().addClass("sticky").css("top",-nav.outerHeight()).animate({"top":top_spacing});
                  }
                } else {

                  element.css({ 'height':'auto' });
                  nav.stop().removeClass("sticky").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""}, 0);

                }

              },
              offset: function() {
                return -nav.outerHeight()-waypoint_offset;
              }
            });


            var sections = element.find("section");
            var navigation_links = element.find("nav a");

            sections.waypoint({
              handler: function(event, direction) {

                var active_section;
                active_section = element;
                if (direction === "up") active_section = active_section.prev();

                var active_link = element.find('nav a[href="#' + active_section.attr("id") + '"]');
                navigation_links.removeClass("selected");
                active_link.addClass("selected");

              },
              offset: '95%'
            }, function(){ $.waypoints("refresh"); });


          });

        }
      };
    }]);
})();
