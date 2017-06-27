(function () {
  angular.module('app.modules')
    .directive('resume', resume);

  function resume() {
    var directive = {
      controller: resumeCtrl,
      controllerAs: 'vm',
      bindToController: true,
      link: bootstrapFunc
    };
    return directive;

    function bootstrapFunc(scope, elem, attrs) {


      // iPad and iPod detection
      var isiPad = function () {
        return (navigator.platform.indexOf("iPad") != -1);
      };

      var isiPhone = function () {
        return (
          (navigator.platform.indexOf("iPhone") != -1) ||
          (navigator.platform.indexOf("iPod") != -1)
        );
      };


      // Go to next section
      var gotToNextSection = function () {
        var el = jQuery('.fh5co-learn-more'),
          w = el.width(),
          divide = -w / 2;
        el.css('margin-left', divide);
      };



      // Scroll Next
      var ScrollNext = function () {
        jQuery('body').on('click', '.scroll-btn', function (e) {
          e.preventDefault();

          jQuery('html, body').animate({
            scrollTop: jQuery(jQuery(this).closest('[data-next="yes"]').next()).offset().top
          }, 1000, 'easeInOutExpo');
          return false;
        });
      };



      // Animations

      var contentWayPoint = function () {
        var i = 0;
        jQuery('.animate-box').waypoint(function (direction) {
          if (direction === 'down' && !jQuery(this.element).hasClass('animated')) {

            i++;

            jQuery(this.element).addClass('item-animate');
            setTimeout(function () {

              jQuery('body .animate-box.item-animate').each(function (k) {
                var el = jQuery(this);
                setTimeout(function () {
                  el.addClass('fadeInUp animated');
                  el.removeClass('item-animate');
                }, k * 200, 'easeInOutExpo');
              });

            }, 100);

          }

        }, {offset: '95%'});
      };



      // Document on load.
      jQuery(function () {

        gotToNextSection();
        ScrollNext();
        // Animate
        contentWayPoint();

      });





      jQuery(document).ready(function () {


        var jcarousel = jQuery('.jcarousel');

        jcarousel
          .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
              width = carousel.innerWidth();

            if (width >= 600) {
              width = width / 6;
            } else if (width >= 350) {
              width = width / 2;
            }

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
          })

          .jcarousel({
            wrap: 'circular'
          });
        jcarousel.jcarouselAutoscroll({
          interval: 3000,
          target: '+=1',
          autostart: true
        });

        jQuery('.jcarousel-pagination')
          .on('jcarouselpagination:active', 'a', function() {
            jQuery(this).addClass('active');
          })
          .on('jcarouselpagination:inactive', 'a', function() {
            jQuery(this).removeClass('active');
          })
          .on('click', function(e) {
            e.preventDefault();
          })
          .jcarouselPagination({
            perPage: 1,
            item: function(page) {
              return '<a href="#' + page + '">' + page + '</a>';
            }
          });




        jQuery("body").fadeIn(2000);


        jQuery("a.transition").click(function (event) {

          event.preventDefault();
          linkLocation = this.href;
          jQuery("body").fadeOut(1000, redirectPage);

        });

        function redirectPage() {
          window.location = linkLocation;
        }

      });
    }
    }



    function resumeCtrl(){

    }
})();