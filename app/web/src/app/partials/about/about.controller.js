(function() {
  angular.module('app.modules')
  .controller('aboutCtrl', aboutCtrl);

function aboutCtrl() {
  var vm = this;
  vm.aboutData = [
    {
      title: '设计思想 Conception',
      time: 1468747661698,
      text: '这个 Blog 的 Codename 是 Juicy。开源于Github，地址： https://github.com/POJOa/Juicy 。\n\nJuicy 第一期只是过年时候练手 Angular 的小作品,为了记录 POJO 桑在法留学的经历,于是把微信朋友圈导出展示。\n可以通过 https://fr.pojox.net/ 访问到。\nJuicy 第二期于当年七月在原有基础上二次开发,加入了后端、文章、友链、音乐推荐等 Blog 的基础功能模块。\n\n两期前后代码风格和质量相当巨大。\n第二期没有封装组件,查询基本写进了 URL ,也全然没有考查第三方库的质量,不过我相信它们是不错的(大概\n\n第二期是在公司一个重要项目启动的同时进行开发的,为了体验极限编程的快感、体验另类的编程思想,POJO 桑仍然作死推进了开发任务。\n每日的开发时间为 22:00 - 24:00+,处于疲劳驾驶状态,但受到 EDP 式编程的启发,仍然在两周左右顺利完成了开发。\n\nEDP (Exhausted Driven Programming) 是一种基于身体被掏空的主观感受的软件工程模型，蜚声海外，国内鲜有布道者。利用此模型，你依然可以在累成 poi 的身体不够实诚的时候开发出想要的轮子，主要方法是 npm install 或者大幅度修改 pom.xml 、从 StackOverflow 上拷贝程式代码，次要方法是氪金买模板或者等别人 commit ，总之是老少咸宜、居家旅行通用的新型模型。\nEDP 编程的分支(包括但不限于散弹枪编程、撞大运编程、Cargo-Cult 编程等)已经造成了巨大的影响力,成为了互联网圈内的话题和新宠,详见CSDN的这篇文章: https://www.csdn.net/article/2012-10-01/2810526\n\nDon\'t mind If you didn\'t get it, just don\'t mind , nothing serious:)',
      featured: false
    },
    {
      title: 'Road to V3',
      time: 1468747661698,
      text: 'Maybe we do some emotion analysis?(optional)\nAngular 2!',
      featured: true
    },
    {
      title: 'Libs',
      time: 1468747661698,
      text: 'Modified Angular-materialize + Materializecss\nModified Angular-grid \nModified ngNeteaseMusic \n偷揉图床 https://x.mouto.org/wb/\nexpress-restify-mongoose\nRedis + Modified cachegoose',
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
      text: 'Author : POJOa\nSite : https://src.moe/',
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