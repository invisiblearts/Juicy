"use strict";!function(){angular.module("app",["ui.router","ui.materialize","app.modules","app.components","neteaseMusic","angular-matchheight"])}(),function(){function e(){return function(e){if(!e)return e;var t=e.replace(/(\r\n|\r|\n)/g,"<br/>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;").replace(/ /g,"&nbsp;");return t}}angular.module("app").filter("breakFilter",e)}(),function(){angular.module("app").constant("APP_CONST",{title:"src | moe",version:"v2 alpha5",production:!0,api:"/api/"})}(),function(){function e(){}angular.module("app").controller("appCtrl",e)}(),function(){angular.module("app").factory("appEvent",["$rootScope",function(e){var t="_DATA_UPDATED_",n=function(n,i){n=n||t,i=i||{},e.$emit(n,i)},i=function(n,i,o){if(angular.isFunction(i)){n=n||t;var a=e.$on(n,i);o&&o.$on("$destroy",a)}};return{publish:n,subscribe:i}}])}(),function(){function e(e,t,n,i){function o(){return localStorage.getItem("juicy_token")}n.debugEnabled(!1),i.debugInfoEnabled(!1),e.defaults.headers.common={Accept:"application/json, text/plain, */*","Content-Type":"application/json"},e.defaults.headers.post={},e.defaults.headers.put={},e.defaults.headers.patch={},e.interceptors.push("jwtInterceptor"),t.tokenGetter=o}e.$inject=["$httpProvider","jwtInterceptorProvider","$logProvider","$compileProvider"],angular.module("app").config(e)}(),function(){function e(e,t){t.otherwise("beats"),e.state("beats",{url:"/beats",templateUrl:"partials/beats/beats.view.html",controller:"beatsCtrl",controllerAs:"vm"}).state("beats.specified",{url:"/month/:month",templateUrl:"partials/beats/beats.view.html",controller:"beatsCtrl",controllerAs:"vm"}).state("about",{url:"/about",templateUrl:"partials/about/about.view.html",controller:"aboutCtrl",controllerAs:"vm"}).state("compose",{url:"/compose",templateUrl:"partials/compose/compose.view.html",controller:"composeCtrl",controllerAs:"vm"}).state("compose-edit",{url:"/compose/:id",templateUrl:"partials/compose/compose.view.html",controller:"composeCtrl",controllerAs:"vm"}).state("login",{url:"/login",templateUrl:"partials/login/login.view.html",controller:"loginCtrl",controllerAs:"vm"}).state("analysis",{url:"/analysis",templateUrl:"partials/analysis/analysis.view.html",controller:"analysisCtrl",controllerAs:"vm"}).state("topics",{url:"/topics",templateUrl:"partials/topics/topics.view.html",controller:"topicsCtrl",controllerAs:"vm"}).state("links",{url:"/links",templateUrl:"partials/links/links.view.html",controller:"linksCtrl",controllerAs:"vm"}).state("topics-detail",{url:"/topics/:id",templateUrl:"partials/topics/topics-detail.view.html",controller:"topicsDetailCtrl",controllerAs:"vm"}).state("baladeur",{url:"/baladeur",templateUrl:"partials/baladeur/baladeur.view.html",controller:"baladeurCtrl",controllerAs:"vm"}).state("resume",{url:"/resume",templateUrl:"partials/resume/resume.view.html",controller:"resumeCtrl",controllerAs:"vm"})}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(e){return t.post("http://x.mouto.org/wb/x.php?up",e)}function a(){if(localStorage.getItem("juicy_token")){var t=e.decodeToken(localStorage.getItem("juicy_token"));if(t)return t.isAdmin}return!1}function r(){var t,n=localStorage.getItem("juicy_token");return!!n&&(t=e.decodeToken(n),!!t)}function c(){var o,a=localStorage.getItem("juicy_token");return a?(o=e.decodeToken(a),t.get(n.api+"v1/users/"+o.id)):i.all("")}var s={uploadImage:o,isAdmin:a,isUser:r,getCurrentUser:c};return s}e.$inject=["jwtHelper","$http","APP_CONST","$q"],angular.module("app").service("appService",e)}(),function(){angular.module("app.modules",["angularGrid","duScroll","angular-jwt","ng-showdown","flow"])}(),function(){angular.module("app.components",["angularGrid","duScroll","infinite-scroll"])}(),function(){function e(){var e=this;e.aboutData=[{title:"设计思想 Conception",time:1468747661698,text:"这个 Blog 的 Codename 是 Juicy。开源于Github，地址： https://github.com/POJOa/Juicy 。\n\nJuicy 第一期只是过年时候练手 Angular 的小作品,为了记录 POJO 桑在法留学的经历,于是把微信朋友圈导出展示。\n可以通过 http://fr.pojox.net/ 访问到。\nJuicy 第二期于当年七月在原有基础上二次开发,加入了后端、文章、友链、音乐推荐等 Blog 的基础功能模块。\n\n两期前后代码风格和质量相当巨大。\n第二期没有封装组件,查询基本写进了 URL ,也全然没有考查第三方库的质量,不过我相信它们是不错的(大概\n\n第二期是在公司一个重要项目启动的同时进行开发的,为了体验极限编程的快感、体验另类的编程思想,POJO 桑仍然作死推进了开发任务。\n每日的开发时间为 22:00 - 24:00+,处于疲劳驾驶状态,但受到 EDP 式编程的启发,仍然在两周左右顺利完成了开发。\n\nEDP (Exhausted Driven Programming) 是一种基于身体被掏空的主观感受的软件工程模型，蜚声海外，国内鲜有布道者。利用此模型，你依然可以在累成 poi 的身体不够实诚的时候开发出想要的轮子，主要方法是 npm install 或者大幅度修改 pom.xml 、从 StackOverflow 上拷贝程式代码，次要方法是氪金买模板或者等别人 commit ，总之是老少咸宜、居家旅行通用的新型模型。\nEDP 编程的分支(包括但不限于散弹枪编程、撞大运编程、Cargo-Cult 编程等)已经造成了巨大的影响力,成为了互联网圈内的话题和新宠,详见CSDN的这篇文章: http://www.csdn.net/article/2012-10-01/2810526\n\nDon't mind If you didn't get it, just don't mind , nothing serious:)",featured:!1},{title:"Road to V3",time:1468747661698,text:"Maybe we do some emotion analysis?(optional)\nAngular 2!",featured:!0},{title:"Libs",time:1468747661698,text:"Modified Angular-materialize + Materializecss\nModified Angular-grid \nModified ngNeteaseMusic \n偷揉图床 http://x.mouto.org/wb/\nexpress-restify-mongoose\nRedis + Modified cachegoose",featured:!1},{title:"v2 alpha6",time:1468747661698,text:"Fixes, Styles , Resume",featured:!0},{title:"v2 alpha5",time:1468604591080,text:"Comment, Avatar",featured:!1},{title:"v2 alpha4",time:1468342287378,text:"Bug Fixes, Baladeur, Comment Init",featured:!1},{title:"v2 alpha3",time:1468066126860,text:"Gulp, Babel, Minify",featured:!1},{title:"v2 alpha2",time:1467907913966,text:"Redis Cache , Links module",featured:!1},{title:"v2 alpha1",time:1467733803777,text:"Image Uploading , Beats and Topics editing , bug fixes",featured:!1},{title:"v2 alpha0",time:1467649952611,text:"Topic Modules with Markdown , ExpressJS Backend and UserLogin",featured:!1},{title:"About Me",time:1456420305e3,text:"Author : POJOa\nSite : http://src.moe/",featured:!1},{title:"v1.5",time:1458114983e3,text:"Multiple Bug Fixes For Recent Tab",featured:!1},{title:"v1.4.2",time:1458012771e3,text:"Ready For Express Backend\nAdded Recent Column\nThe Filter In Recent Column Currently Won't Work",featured:!1},{title:"v1.4.1",time:1457162347e3,text:"Initialization of Compose Module",featured:!1},{title:"Stable Release v1.4 (Nozomi)",time:1456751208e3,text:"Optimized performance",featured:!0},{title:"v1.4 RC1 2016.02.28",time:1456675603e3,text:"Nozomi is a Stable Version Milestone , from then I'll create a backend in express for it.\nOptimized Documentation.\nRenewed Card Style\nRefractor and Added Navbar Order\nRefresh Policy Change",featured:!1},{title:"v1.3 2016.02.25",time:1456420305e3,text:"Heavy Refractor of Card/Cards View and components\nUpdated angular-grid\nSolved various tiny bugs\n",featured:!1},{title:"v1.2 2016.02.24",time:14562432e5,text:"Refractor jcSubNav\nEnhancement of Picture Displaying\nDisabled Slider (will be taken into account after next major release)\nAdded App Drawer For Mobile Devices\n"},{title:"v1.1 2016.02.23",time:14561568e5,text:"Added Navbar Customize Configuration Provider\nAdded Event Service.\nFixed (and disabled) Card Control.\nFixed Navbar Bug , added version badge.\nMinimalized data for Github."},{title:"Release v1 2016.02.13",time:14552928e5,text:"Adjust Navbar Style.\nAdded Loading Bar.\nSpecified Feature Cards.\n",featured:!0},{title:"Pre-release 2016.02.12",time:14552064e5,text:"Fixed height issue."},{title:"v0.4 2016.02.11",time:145512e7,text:"Unlimited Refreshing! Featured Filter!!"},{title:"v0.3 2016.02.10",time:14550336e5,text:"Added Cascade Displaying , switched to UI-Router"},{title:"v0.2 2016.02.09",time:14549472e5,text:"Built Project Skeleton , added cascade displaying"},{title:"v0.1 2016.02.08",time:14548608e5,text:"Simplified JSON structure"}]}angular.module("app.modules").controller("aboutCtrl",e)}(),function(){function e(e){e.$get().addMenu([{title:"Changelog",state:"about",order:15}])}e.$inject=["jcNavProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i,o,a,r,c,s,u){function l(){}function p(){c.postBaladeur(S.newBaladeur).then(function(){return S.newBaladeur={createdAt:(new Date).getTime(),description:"Description goes here",genre:"Alt.Rock",image:[],emo:0,express:0,ids:[],title:"Title goes Here",artist:"Artist goes Here"}})}function d(e){S.newBaladeur=angular.copy(e),S.newBaladeur.ids=S.newBaladeur.ids.join(",")}function m(){b()}function f(e,t,n){r.uploadImage(n.files[0].file).success(function(e){return S.newBaladeur.image[0]="http://ww4.sinaimg.cn/large/"+e.pid})}function g(){S.settings.current="moe",h(S.settings)}function v(){S.settings.current="all",h(S.settings)}function h(){S.baladeurList=[],S.lock=!1,S.pageForCustomRefresh=0,b()}function b(){var e=S.pageForCustomRefresh*y;w&&(y=C),S.lock||(S.lock=!0,$(e,y,S.settings).success(function(e){e&&e.length?(angular.forEach(e,function(e){e.init=w,S.baladeurList||(S.baladeurList=[]),S.baladeurList.push(e)}),S.pageForCustomRefresh++,S.lock=!1):S.lock=!0,w=!1}))}var $,w,C,y,S=this;window.alert=null,S.playConfig={autoPlay:!1,size:"normal",fold:!0},S.newBaladeur={createdAt:(new Date).getTime(),description:"Description goes here",genre:"Alt.Rock",image:["1.jpg"],emo:0,express:0,ids:[],title:"Title goes Here",artist:"Artist goes Here"},S.choices=[0,1,2],S.baladeurList=[],S.start=0,S.reachedEnd=!1,S.lock=!1,S.loadMore=m,S.upload=f,S.submit=p,S.edit=d,S.moe=g,S.all=v,S.settings={emo:{neg:!0,soso:!0,pos:!0},express:{neg:!0,soso:!0,pos:!0},current:"all"},S.isAdmin=r.isAdmin(),S.pageForCustomRefresh=0,$=c.fetchBySkipAndLimit,w=!0,C=3,y=3,l(),e.$watch("vm.settings",h,!0)}e.$inject=["$scope","$http","$state","$window","$document","appEvent","appService","baladeurService","jwtHelper","beatsService"],angular.module("app.modules").controller("baladeurCtrl",e)}(),function(){function e(e,t){e.$get().addMenu([{title:"Baladeur♪",state:"baladeur",order:10}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/baladeurs")}function a(t){return e["delete"](i.api+"v1/baladeurs/"+t)}function r(t,n,o){function a(e){var t={express:{$in:[0,1,2]},emo:{$in:[0,1,2]}};return o.emo.neg||t.emo.$in.splice(t.emo.$in.indexOf(0),1),o.emo.soso||t.emo.$in.splice(t.emo.$in.indexOf(1),1),o.emo.pos||t.emo.$in.splice(t.emo.$in.indexOf(2),1),o.express.neg||t.express.$in.splice(t.express.$in.indexOf(0),1),o.express.soso||t.express.$in.splice(t.express.$in.indexOf(1),1),o.express.pos||t.express.$in.splice(t.express.$in.indexOf(2),1),e&&(t.genre={$regex:"[Mm]oe"}),JSON.stringify(t)}var r=a("moe"===o.current);return e.get(i.api+"v1/baladeurs?sort=-time&populate=tags&skip="+t+"&limit="+n+"&query="+r)}function c(t,n,o){return e.get(i.api+"v1/baladeurs?sort=-time&populate=tags&skip="+t+"&limit="+n+'&query={"genre":{"$regex":"[Mm]oe"}}')}function s(t){return t.emo=parseInt(t.emo,10),t.express=parseInt(t.express,10),t.ids=t.ids.split(",").map(function(e){return parseInt(e,10)}),t._id?e.patch(i.api+"v1/baladeurs/"+t._id,t):e.post(i.api+"v1/baladeurs",t)}var u={fetchAll:o,fetchBySkipAndLimit:r,deleteOne:a,postBaladeur:s,fetchBySkipAndLimitMoe:c};return u}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("baladeurService",e)}(),function(){function e(e,t,n,i,o,a,r,c){function s(){g.topicId&&r.fetchOne(g.topicId).success(function(e){return g.newTopic=e[0]})}function u(){r.postTopic(g.newTopic)}function l(e,t,n){a.uploadImage(n.files[0].file).success(function(e){return g.newTopic.content+="![image](http://ww4.sinaimg.cn/large/"+e.pid+")"})}function p(){c.fetchByName(g.newTag.name).success(function(e){e[0]&&e[0]._id?d(e[0]):c.postTag(g.newTag).success(function(e){return d(e)})})}function d(e){var t,n=!1;for(null==g.newTopic.tags&&(g.newTopic.tags=[]),t=0;t<g.newTopic.tags.length;t++)if(n=g.newTopic.tags[t]._id===e._id){g.newTopic.tags[t]=e;break}n||g.newTopic.tags.push(e),g.newTag={name:"Tag Name Goes Here","class":"blue"}}function m(e){g.newTag=angular.copy(e)}function f(e){c.deleteOne(e._id)}var g=this;g.submitTopic=u,g.upload=l,g.addTag=p,g.modifyTag=m,g.deleteTag=f,g.topicId=n.params.id,g.newTopic={title:"Topic Title Here",content:"",featured:!1,tags:[]},g.newTag={name:"Tag Name Goes Here","class":"blue"},s()}e.$inject=["$scope","$http","$state","$document","appEvent","appService","topicsService","tagsService"],angular.module("app.modules").controller("composeCtrl",e)}(),function(){function e(e,t){t.$get().isAdmin()&&e.$get().addMenu([{title:"Compose",state:"compose",order:13}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/tags")}function a(t){return e["delete"](i.api+"v1/tags/"+t)}function r(t){return e.get(i.api+'v1/tags?query={"name":"'+t+'"}')}function c(t){return e.get(i.api+"v1/tags/"+t)}function s(t){return t._id?e.patch(i.api+"v1/tags/"+t._id,t):e.post(i.api+"v1/tags",t)}var u={fetchAll:o,fetchByName:r,deleteOne:a,postTag:s,fetchById:c};return u}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("tagsService",e)}(),function(){function e(e,t,n,i,o,a,r,c,s,u,l){function p(){var e=N.pageForCustomRefresh*D;_&&(D=R),N.lock||(N.lock=!0,u.fetchBySkipAndLimit(e,D).success(function(e){e&&e.length?(angular.forEach(e,function(e){e.init=_,N.selectedBeats.beats||(N.selectedBeats.beats=[]),N.selectedBeats.beats.push(e)}),N.pageForCustomRefresh++,N.lock=!1):N.lock=!0,_=!1}))}function d(){i.scrollTop(0,2e3)}function m(e,t){N.newBeat=t}function f(e,t){u.deleteOne(t)}function g(e){return N.currentSelectedMonth=e,N.currentSelectedTab=v(e),u.fetchByMonth(e,1).success(function(e){N.selectedBeats=e})}function v(e){return{title:C(e),state:"beats.specified",stateParam:{month:e}}}function h(){N.newBeat={text:"",featured:!1,safe:!0,tags:[]}}function b(){N.isUser=a.isUser(),c.fetchBySkipAndLimit(0,3).success(function(e){return N.topicList=e}),$().then(function(e){N.tabs=e,null!=n.params.month?(N.customRefreshEnabled=!1,g(n.params.month)):(N.currentSelectedTab={title:"Recent",state:"beats"},N.customRefreshEnabled=!0,p())})}function $(){var e=[{title:"Recent",state:"beats"}];return u.fetchAvailableMonths().then(function(t){return angular.forEach(t.data,function(t){e.push({title:C(t),state:"beats.specified",stateParam:{month:t}})}),e})}function w(e,t){N.currentSelectedTab=t,N.lock=!1,t.stateParam&&t.stateParam.month?(N.selectedBeats=[],g(t.stateParam.month),N.customRefreshEnabled=!1):(N.selectedBeats=[],N.pageForCustomRefresh=0,N.customRefreshEnabled=!0,p())}function C(e){var t=e.substring(0,2),n=e.substring(2,4);return n+"/"+t}function y(e,t){n.go("topics-detail",t)}function S(){n.go("login")}function T(){u.postBeat(N.newBeat)}function j(e,t){n.go("compose-edit",t)}function A(e,t){N.newComment={},N.newComment.beat=t._id}function k(e,t,n){a.uploadImage(n.files[0].file).success(function(e){return N.newBeat.image.push("http://ww4.sinaimg.cn/large/"+e.pid)})}function B(){r.fetchByName(N.newTag.name).success(function(e){e[0]&&e[0]._id?P(e[0]):r.postTag(N.newTag).success(function(e){return P(e)})})}function P(e){var t,n=!1;for(null==N.newBeat.tags&&(N.newBeat.tags=[]),t=0;t<N.newBeat.tags.length;t++)if(n=N.newBeat.tags[t]._id===e._id){N.newBeat.tags[t]=e;break}n||N.newBeat.tags.push(e),N.newTag={name:"Tag Name Goes Here","class":"blue"}}function x(e){N.newTag=angular.copy(e)}function O(e){r.deleteOne(e._id)}function U(){var e=angular.copy(N.newComment.beat);if(N.newComment.body&&""!==N.newComment.body)return delete N.newComment.beat,u.postComment(e,N.newComment).success(function(t){return o.publish("card_update_"+e,t)})}var N=this,D=6,R=15,_=!0;N.isAdmin=a.isAdmin(),N.upload=k,N.submitBeat=T,N.addTag=B,N.clearCurrentBeat=h,N.modifyTag=x,N.deleteTag=O,N.newComment={},N.newTag={name:"Tag Name Goes Here","class":"blue"},N.newBeat={text:"",featured:!1,safe:!0,tags:[]},N.login=S,N.customRefreshEnabled=!1,N.monthNeeded=[],N.tabs=[],N.lock=!1,N.selectedBeats=[],N.currentSelectedTab={},N.jcSubNavSettings=[{type:"toggle",title:"Featured Only",value:!1,event:"toggleFeatured"},{type:"toggle",title:"Hide Selfie",value:!0,event:"toggleWeired"}],N.getBeatOfMonth=g,N.scrollTop=d,N.pushBeatsPaginated=p,N.submitComment=U,N.pageForCustomRefresh=0,b(),o.subscribe("jcSubNavSectionSwitched",w,e),o.subscribe("modifyBeats",m,e),o.subscribe("deleteBeats",f,e),o.subscribe("topicSelected",y,e),o.subscribe("editTopic",j,e),o.subscribe("comment",A,e)}e.$inject=["$scope","$http","$state","$document","appEvent","appService","tagsService","topicsService","jwtHelper","beatsService","angularGridInstance"],angular.module("app.modules").controller("beatsCtrl",e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/beats")}function a(t){return e["delete"](i.api+"v1/beats/"+t)}function r(t,n){return e.get(i.api+'v1/beats?sort=-time&populate=[{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]&skip='+t+"&limit="+n)}function c(t,n){return e.get(i.api+"beats/yymm/"+t+"/duration/"+n)}function s(){return e.get(i.api+"beats/months")}function u(t){return t._id?e.patch(i.api+"v1/beats/"+t._id,t):e.post(i.api+"v1/beats",t)}function l(t,n){return e.post(i.api+"beats/"+t+"/comment",n)}var p={fetchAll:o,fetchByMonth:c,fetchBySkipAndLimit:r,fetchAvailableMonths:s,deleteOne:a,postBeat:u,postComment:l};return p}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("beatsService",e)}(),function(){function e(e,t,n,i,o,a,r,c){function s(){f.isAdmin=r.isAdmin(),c.fetchAll().success(function(e){return f.links=e})}function u(e,t,n){r.uploadImage(n.files[0].file).success(function(e){return f.newLink.img="http://ww4.sinaimg.cn/large/"+e.pid})}function l(e){i.open(e)}function p(){c.postLink(f.newLink)}function d(e){f.newLink=e}function m(e){c.deleteOne(e._id)}var f=this;f.upload=u,f.open=l,f.submit=p,f.modify=d,f.del=m,f.isAdmin=!1,f.links=[],f.newLink={title:"New Link Title",description:"Site Description",img:"Image URL",alias:"Owner's Nickname",color:"Experimental Tag Color Picker",href:"Link Goes Here"},s()}e.$inject=["$scope","$http","$state","$window","$document","appEvent","appService","linksService"],angular.module("app.modules").controller("linksCtrl",e)}(),function(){function e(e,t){e.$get().addMenu([{title:"Friends!",state:"links",order:1}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/links")}function a(t){return e["delete"](i.api+"v1/links/"+t)}function r(t,n){return e.get(i.api+"v1/links?sort=-time&skip="+t+"&limit="+n)}function c(t){return t._id?e.patch(i.api+"v1/links/"+t._id,t):e.post(i.api+"v1/links",t)}var s={fetchAll:o,fetchBySkipAndLimit:r,deleteOne:a,postLink:c};return s}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("linksService",e)}(),function(){function e(e,t,n,i,o,a,r,c){function s(){c.getCurrentUser().then(function(e){return f.currentUser=e.data})}function u(){f.userLogin&&f.userLogin.username&&""!==f.userLogin.username&&f.userLogin.password&&""!==f.userLogin.password&&r.login(f.userLogin).success(l).error(function(e){return r.reg(f.userLogin).success(l)})}function l(e){"string"==typeof e&&localStorage.setItem("juicy_token",e),s()}function p(e,t,n){c.uploadImage(n.files[0].file).success(function(e){return f.currentUser.avatar="http://ww4.sinaimg.cn/large/"+e.pid})}function d(){r.evict()}function m(){r.updateUser(f.currentUser)}var f=this;f.loginOrReg=u,f.evict=d,f.userLogin={username:"",password:""},f.currentUser={},f.updateUser=m,f.upload=p,s()}e.$inject=["$scope","$http","$state","$document","appEvent","jwtHelper","loginService","appService"],angular.module("app.modules").controller("loginCtrl",e)}(),function(){function e(e,t){e.$get().addMenu([{title:"Login",state:"login",order:14}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(t){return e({url:i.api+"user/login",dataType:"json",method:"POST",data:t,headers:{"Content-Type":"application/json"}})}function a(t){return e({url:i.api+"user/reg",dataType:"json",method:"POST",data:t,headers:{"Content-Type":"application/json"}})}function r(t){return e.patch(i.api+"v1/users/"+t._id,t)}function c(){return e.get(i.api+"evictCache")}var s={login:o,reg:a,evict:c,updateUser:r};return s}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("loginService",e)}(),function(){function e(e,t,n,i,o,a,r){function c(){r.findOneByStaticType("resume").success(function(e){e[0]||n.go("beats"),p.topicData=e[0]})}function s(e,t){n.go("compose-edit",t)}function u(){return r.postComment(p.topicId,p.newComment).success(function(e){return p.topicData=e})}function l(){n.go("login")}var p=this;p.topicData={},p.topicId=n.params.id,p.submitComment=u,p.isUser=a.isUser(),p.login=l,c(),o.subscribe("editTopic",s,e)}e.$inject=["$scope","$http","$state","$document","appEvent","appService","topicsService"],angular.module("app.modules").controller("resumeCtrl",e)}(),function(){function e(e){e.$get().addMenu([{title:"Resume",state:"resume",order:14}])}e.$inject=["jcNavProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i,o,a,r){function c(){p.topicId||n.go("beats"),r.fetchOne(p.topicId).success(function(e){return p.topicData=e[0]})}function s(e,t){n.go("compose-edit",t)}function u(){return r.postComment(p.topicId,p.newComment).success(function(e){return p.topicData=e})}function l(){n.go("login")}var p=this;p.topicData={},p.topicId=n.params.id,p.submitComment=u,p.isUser=a.isUser(),p.login=l,c(),o.subscribe("editTopic",s,e)}e.$inject=["$scope","$http","$state","$document","appEvent","appService","topicsService"],angular.module("app.modules").controller("topicsDetailCtrl",e)}(),function(){function e(e,t,n,i,o,a){function r(){c()}function c(){var e=m.pageForCustomRefresh*d;l&&(d=p),m.lock||(m.lock=!0,a.fetchBySkipAndLimit(e,d).success(function(e){e&&e.length?(angular.forEach(e,function(e){e.init=l,m.topicList||(m.topicList=[]),m.topicList.push(e)}),m.pageForCustomRefresh++,m.lock=!1):m.lock=!0,l=!1}))}function s(e,t){n.go("topics-detail",t)}function u(e,t){n.go("compose-edit",t)}var l,p,d,m=this;m.topicList=[],m.start=0,m.reachedEnd=!1,m.lock=!1,m.loadMore=r,m.pageForCustomRefresh=0,l=!0,p=3,d=3,o.subscribe("topicSelected",s,e),o.subscribe("editTopic",u,e)}e.$inject=["$scope","$http","$state","$document","appEvent","topicsService"],angular.module("app.modules").controller("topicsCtrl",e)}(),function(){function e(e){e.$get().addMenu([{title:"Topics",state:"topics",order:5}])}e.$inject=["jcNavProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/topics&populate=tags&staticType=null")}function a(t,n){return e.get(i.api+"v1/topics?sort=-createdAt&skip="+t+"&limit="+n+'&select=_id,title,featured,createdAt,summary,content,tags,staticType&populate=tags&query={"staticType":{"$in":[null,""]}}')}function r(t){return e.get(i.api+'v1/topics?query={"_id":"'+t+'"}&populate=[{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]')}function c(t,n){return e.get(i.api+"topics/yymm/"+t+"/duration/"+n)}function s(){return e.get(i.api+"topics/months")}function u(t){return t._id?e.patch(i.api+"v1/topics/"+t._id,t):e.post(i.api+"v1/topics",t)}function l(t,n){return e.post(i.api+"topic/"+t+"/comment",n)}function p(t){return e.get(i.api+'v1/topics?query={"staticType":"'+t+'"}&populate=[{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]')}var d={fetchAll:o,fetchByMonth:c,fetchBySkipAndLimit:a,fetchAvailableMonths:s,fetchOne:r,postTopic:u,postComment:l,findOneByStaticType:p};return d}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("topicsService",e)}(),function(){function e(e){function t(e,t,n,i){e.vm.content=i.content,e.vm.showDst=i.showDst,e.vm.utcCn=i.utcCn,e.vm.isAdmin=i.isAdmin,e.vm.hideProgress=i.hideProgress,e.vm.refreshInit()}function n(t,n){function i(){angular.isUndefined(e)||angular.isUndefined(e.cards)||!c.content.init||e.cards.refresh()}function o(e){var t=n("date")(new Date(e),"yyyy-MM-dd HH:mm:ss",a(e));return c.showDst&&(t+="+0100"===a(e)?" Winter Time":" Summer Time"),t}function a(e){if(!angular.isUndefined(e))return e=new Date(e),e>new Date(14275872e5)&&e<new Date(14457312e5)||e>new Date(13961376e5)&&e<new Date(14142816e5)?"+0200":c.utcCn?"+0800":"+0100"}var r,c=this;c.timeMessage="",c.refreshInit=i,r=t.$watch("vm.content.time",function(e){c.timeMessage=o(e),r()})}n.$inject=["$scope","$filter"];var i={controller:n,controllerAs:"vm",templateUrl:"components/card/card-content.tmpl.html",scope:{},require:"^^jcCard",link:t,bindToController:!0};return i}e.$inject=["angularGridInstance"],angular.module("app.components").directive("jcCardContent",e)}(),function(){function e(){function e(e,t,n,i){e.cardCtrl=i,e.vm.content=i.content,e.vm.appEvent.subscribe("card_update_"+e.vm.content._id,e.vm.handleUpdate,e)}function t(e,t,n,i,o){function a(){e.cardCtrl.deleted=!0,t.publish("deleteBeats",l.content._id)}function r(){t.publish("modifyBeats",l.content)}function c(){t.publish("comment",l.content)}function s(){i.postComment(l.content._id,l.newComment)}function u(e,t){l.content=t,o.cards&&o.cards.refresh()}var l=this;l.deleteBeats=a,l.modifyBeats=r,l.submitComment=s,l.comment=c,l.isUser=n.isUser(),l.isAdmin=n.isAdmin(),l.appEvent=t,l.handleUpdate=u,l.newComment={body:""}}t.$inject=["$scope","appEvent","appService","beatsService","angularGridInstance"];var n={controller:t,controllerAs:"vm",templateUrl:"components/card/card-control.tmpl.html",require:"^^jcCard",scope:{},link:e,bindToController:!0};return n}angular.module("app.components").directive("jcCardControl",e)}(),function(){function e(){function e(e,t){var n=this;n.deleted=!1,n.prod=e.production,n.isAdmin=t.isAdmin()}e.$inject=["APP_CONST","appService"];var t={controller:e,controllerAs:"vm",templateUrl:"components/card/card.tmpl.html",scope:{content:"=jcContent",showDst:"@jcShowDst",utcCn:"@jcShowUtcCn",hideCtrl:"@jcHideCtrl",hideProgress:"@jcHideProgress"},bindToController:!0};return t}angular.module("app.components").directive("jcCard",e)}(),function(){function e(e){function t(e,t,n,i){function o(){p.customRefreshEnabled?(p.displayedDataMirror=p.data,p.displayedData=t("filter")(p.displayedDataMirror,c)):a()}function a(){var e=!0;p.displayedData=[],g=[],f=0,s(d,e)}function r(e,t){for(var n=0;n<p.displayedData.length;n++)if(p.displayedData[n].time===t)return p.displayedData.splice(n,1),void f--}function c(e){var t,n;return null==e.featured&&(e.featured=!1),null==e.safe&&(e.safe=!0),t=!p.featuredOnly||p.featuredOnly&&e.featured,n=!p.safeOnly||p.safeOnly&&e.safe,t&&n}function s(e,t){for(var n=0;n<e;n++){if(null==p.data||null==p.data[f])return;t&&(p.data[f].init=!0),g.push(p.data[f]),c(p.data[f])?p.displayedData.push(p.data[f]):n--,f++}}function u(){p.customRefreshEnabled?p.customRefresh():s(m)}function l(e){return function(i,o){1!=o&&(o=!1),p[e]=o,n.cards.refresh(),s(m),p.displayedData=t("filter")(g,c)}}var p=this,d=p.initialCard?parseInt(p.initialCardNum,10):15,m=p.newCardPerPage?parseInt(p.newCardPerPage,10):6,f=0,g=[];p.displayedData=[],p.loadMore=u,p.featuredOnly=!1,p.safeOnly=!0,i.subscribe("toggleFeatured",l("featuredOnly"),e),i.subscribe("toggleWeired",l("safeOnly"),e),i.subscribe("deleteData",r,e),e.$watchCollection("vm.data",function(){p.data&&p.data.length&&o()},!0),e.$on("$repeatFinished",function(e,t){n.cards.refresh()})}t.$inject=["$scope","$filter","angularGridInstance","appEvent"];var n={controller:t,controllerAs:"vm",templateUrl:"components/masonry-cards/masonry-cards.view.html",scope:{data:"=jcData",initialCardNum:"@jcInitNum",newCardPerPage:"@jcRefreshNum",customRefresh:"=jcCustomRefresh",customRefreshEnabled:"=jcCustomRefreshEnabled"},bindToController:!0};return n}e.$inject=["$q"],angular.module("app.modules").directive("jcMasonryCards",e)}(),function(){function e(e){return function(t,n){var i=angular.element(e),o=function(){t.winWidth=i.width()};i.bind("resize",function(){o()}),o()}}e.$inject=["$window"],angular.module("app.components").directive("resize",e)}(),function(){function e(e){function t(e,t,n,i,o,a,r){function c(e){a.go(e)}var s=this;s.state=a,s.appTitle=o.title,s.appVersion=o.version,s.navs=n("orderBy")(e.navConfig,"order",!0),s.gotoState=c}t.$inject=["jcNav","$scope","$filter","appEvent","APP_CONST","$state","$rootScope"];var n={controller:t,controllerAs:"vm",templateUrl:"components/nav/nav.tmpl.html",bindToController:!0};return n}e.$inject=["$state"],angular.module("app.components").directive("jcNav",e)}(),function(){function e(){function e(e){angular.forEach(e,function(e){t(e)})}function t(e){n.push(e)}var n=[];this.$get=function(){return{addMenu:e,navConfig:n}}}angular.module("app").provider("jcNav",e)}(),function(){function e(){function e(e,t,n,i){e.vm.settings=i.settings}function t(e){function t(t){e.publish(t.event,t.value)}var n=this;n.handleSettings=t}t.$inject=["appEvent"];var n={controller:t,controllerAs:"vm",require:"^jcSubNav",link:e,templateUrl:"components/sub-nav/sub-nav-settings.tmpl.html",bindToController:!0};return n}angular.module("app.components").directive("jcSubNavSettings",e)}(),function(){function e(){function e(e,t,n,i){e.subNavCtrl=i}function t(e,t,n,i,o){function a(){t.scrollTop(63.9,2e3)}function r(e){a(),n.go(e.state,e.stateParam),o.publish("jcSubNavSectionSwitched",e)}var c=this;c.displaySection=r,c.displaySettings=!1,i.$watch("subNavCtrl.sections",function(){c.reload=!0})}t.$inject=["$rootScope","$document","$state","$scope","appEvent"];var n={controller:t,controllerAs:"vm",templateUrl:"components/sub-nav/sub-nav-tabs.tmpl.html",require:"^jcSubNav",link:e,bindToController:!0};return n}angular.module("app.components").directive("jcSubNavTabs",e)}(),function(){function e(){function e(e,t){var n=this;n.displaySettings=!1}e.$inject=["$scope","appEvent"];var t={controller:e,controllerAs:"vm",templateUrl:"components/sub-nav/sub-nav.tmpl.html",scope:{sections:"=jcSections",active:"=jcActive",settings:"=jcSettings"},bindToController:!0};return t}angular.module("app.components").directive("jcSubNav",e)}(),function(){function e(){function e(e,t,n,i,o){function a(){void 0!==u.jcTopic&&(u.jcTopicBrief||(u.jcTopic.html=t.makeHtml(u.jcTopic.content)))}function r(e){o.publish("topicSelected",{id:e})}function c(e){o.publish("editTopic",{id:e})}function s(){u.nowUrl="https://src.moe/#"+n.url(),function(t,n,i){function o(){window.open(""+a+c,"mb","toolbar=0,status=0,resizable=1,width=620,height=450,left="+(t.width-620)/2+",top="+(t.height-450)/2)||(r.href=""+a+c)}try{}catch(i){}var a="http://v.t.sina.com.cn/share/share.php?",r=e.nowUrl,c="url="+i(r)+"&title="+i(u.jcTopic.title)+"&pic="+i(u.jcTopic.thumbnail);/Firefox/.test(navigator.userAgent)?setTimeout(o,0):o()}(screen,document,encodeURIComponent)}var u=this;u.selectTopic=r,u.share=s,u.editTopic=c,u.isAdmin=i.isAdmin(),a(),e.$watch("vm.jcTopic",function(){u.jcTopic&&a()},!0)}e.$inject=["$scope","$showdown","$location","appService","appEvent"];var t={controller:e,controllerAs:"vm",scope:{jcTopic:"=",jcTopicBrief:"=",jcTopicShare:"=",jcShadowDisabled:"="},templateUrl:"components/topic-card/topic-card.view.html",bindToController:!0};return t}angular.module("app.components").directive("jcTopicCard",e)}();