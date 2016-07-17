(function() {
  angular.module('app.modules')
  .controller('aboutCtrl', aboutCtrl);

function aboutCtrl() {
  var vm = this;
  vm.aboutData = [
    {
      title: 'Road to V3',
      time: 1468747661698,
      text: 'Maybe we do some emotion analysis?(optional)\nAngular 2!',
      featured: true
    },
    {
      title: 'Libs',
      time: 1468747661698,
      text: 'Modified Angular-materialize + Materializecss\nModified Angular-grid \nModified ngNeteaseMusic \n偷揉图床 http://x.mouto.org/wb/\nexpress-restify-mongoose\nRedis + Modified cachegoose',
      featured: false
    },
    {
      title: 'v2 alpha6',
      time: 1468747661698,
      text: 'Fixes, Styles , Resume',
      featured: true
    },
    {
      title: 'v2 alpha5',
      time: 1468604591080,
      text: 'Comment, Avatar',
      featured: false
    },
    {
      title: 'v2 alpha4',
      time: 1468342287378,
      text: 'Bug Fixes, Baladeur, Comment Init',
      featured: false
    },
    {
      title: 'v2 alpha3',
      time: 1468066126860,
      text: 'Gulp, Babel, Minify',
      featured: false
    },
    {
      title: 'v2 alpha2',
      time: 1467907913966,
      text: 'Redis Cache , Links module',
      featured: false
    },
    {
      title: 'v2 alpha1',
      time: 1467733803777,
      text: 'Image Uploading , Beats and Topics editing , bug fixes',
      featured: false
    },
    {
      title: 'v2 alpha0',
      time: 1467649952611,
      text: 'Topic Modules with Markdown , ExpressJS Backend and UserLogin',
      featured: false
    },
    {
      title: 'About Me',
      time: 1456420305000,
      text: 'Author : POJOa\nSite : http://src.moe/',
      featured: false
    },
    {
      title: 'v1.5',
      time: 1458114983000,
      text: 'Multiple Bug Fixes For Recent Tab',
      featured: false
    },
    {
      title: 'v1.4.2',
      time: 1458012771000,
      text: 'Ready For Express Backend\nAdded Recent Column\nThe Filter In Recent Column Currently Won\'t Work',
      featured: false,
    },
    {
      title: 'v1.4.1',
      time: 1457162347000,
      text: 'Initialization of Compose Module',
      featured: false,
    },
    {
      title: 'Stable Release v1.4 (Nozomi)',
      time: 1456751208000,
      text: 'Optimized performance',
      featured: true,
    },
    {
      title: 'v1.4 RC1 2016.02.28',
      time: 1456675603000,
      text: 'Nozomi is a Stable Version Milestone , from then I\'ll create a backend in express for it.\nOptimized Documentation.\nRenewed Card Style\nRefractor and Added Navbar Order\nRefresh Policy Change',
      featured: false,
    },
    {
      title: 'v1.3 2016.02.25',
      time: 1456420305000,
      text: 'Heavy Refractor of Card/Cards View and components\nUpdated angular-grid\nSolved various tiny bugs\n',
      featured: false,
    },
    {
      title: 'v1.2 2016.02.24',
      time: 1456243200000,
      text: 'Refractor jcSubNav\nEnhancement of Picture Displaying\nDisabled Slider (will be taken into account after next major release)\nAdded App Drawer For Mobile Devices\n',
    },
    {
      title: 'v1.1 2016.02.23',
      time: 1456156800000,
      text: 'Added Navbar Customize Configuration Provider\nAdded Event Service.\nFixed (and disabled) Card Control.\nFixed Navbar Bug , added version badge.\nMinimalized data for Github.',
    },
    {
      title: 'Release v1 2016.02.13',
      time: 1455292800000,
      text: 'Adjust Navbar Style.\nAdded Loading Bar.\nSpecified Feature Cards.\n',
      featured: true
    },
    {
      title: 'Pre-release 2016.02.12',
      time: 1455206400000,
      text: 'Fixed height issue.',
    },
    {
      title: 'v0.4 2016.02.11',
      time: 1455120000000,
      text: 'Unlimited Refreshing! Featured Filter!!',
    },
    {
      title: 'v0.3 2016.02.10',
      time: 1455033600000,
      text: 'Added Cascade Displaying , switched to UI-Router',
    },
    {
      title: 'v0.2 2016.02.09',
      time: 1454947200000,
      text: 'Built Project Skeleton , added cascade displaying',
    },
    {
      title: 'v0.1 2016.02.08',
      time: 1454860800000,
      text: 'Simplified JSON structure',
    }
  ];

}
})();