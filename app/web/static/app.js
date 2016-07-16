"use strict";!function(){angular.module("app",["ui.router","ui.materialize","app.modules","app.components","neteaseMusic"])}(),function(){function e(){return function(e){if(!e)return e;var t=e.replace(/(\r\n|\r|\n)/g,"<br/>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;").replace(/ /g,"&nbsp;");return t}}angular.module("app").filter("breakFilter",e)}(),function(){angular.module("app").constant("APP_CONST",{title:"src | moe",version:"v2 alpha5",production:!0,api:"/api/"})}(),function(){function e(){}angular.module("app").controller("appCtrl",e)}(),function(){angular.module("app").factory("appEvent",["$rootScope",function(e){var t="_DATA_UPDATED_",n=function(n,i){n=n||t,i=i||{},e.$emit(n,i)},i=function(n,i,o){if(angular.isFunction(i)){n=n||t;var a=e.$on(n,i);o&&o.$on("$destroy",a)}};return{publish:n,subscribe:i}}])}(),function(){function e(e,t,n,i){function o(){return localStorage.getItem("juicy_token")}n.debugEnabled(!1),i.debugInfoEnabled(!1),e.defaults.headers.common={Accept:"application/json, text/plain, */*","Content-Type":"application/json"},e.defaults.headers.post={},e.defaults.headers.put={},e.defaults.headers.patch={},e.interceptors.push("jwtInterceptor"),t.tokenGetter=o}e.$inject=["$httpProvider","jwtInterceptorProvider","$logProvider","$compileProvider"],angular.module("app").config(e)}(),function(){function e(e,t){t.otherwise("beats"),e.state("beats",{url:"/beats",templateUrl:"partials/beats/beats.view.html",controller:"beatsCtrl",controllerAs:"vm"}).state("beats.specified",{url:"/month/:month",templateUrl:"partials/beats/beats.view.html",controller:"beatsCtrl",controllerAs:"vm"}).state("about",{url:"/about",templateUrl:"partials/about/about.view.html",controller:"aboutCtrl",controllerAs:"vm"}).state("compose",{url:"/compose",templateUrl:"partials/compose/compose.view.html",controller:"composeCtrl",controllerAs:"vm"}).state("compose-edit",{url:"/compose/:id",templateUrl:"partials/compose/compose.view.html",controller:"composeCtrl",controllerAs:"vm"}).state("login",{url:"/login",templateUrl:"partials/login/login.view.html",controller:"loginCtrl",controllerAs:"vm"}).state("analysis",{url:"/analysis",templateUrl:"partials/analysis/analysis.view.html",controller:"analysisCtrl",controllerAs:"vm"}).state("topics",{url:"/topics",templateUrl:"partials/topics/topics.view.html",controller:"topicsCtrl",controllerAs:"vm"}).state("links",{url:"/links",templateUrl:"partials/links/links.view.html",controller:"linksCtrl",controllerAs:"vm"}).state("topics-detail",{url:"/topics/:id",templateUrl:"partials/topics/topics-detail.view.html",controller:"topicsDetailCtrl",controllerAs:"vm"}).state("baladeur",{url:"/baladeur",templateUrl:"partials/baladeur/baladeur.view.html",controller:"baladeurCtrl",controllerAs:"vm"})}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(e){return t.post("http://x.mouto.org/wb/x.php?up",e)}function a(){if(localStorage.getItem("juicy_token")){var t=e.decodeToken(localStorage.getItem("juicy_token"));if(t)return t.isAdmin}return!1}function r(){var t,n=localStorage.getItem("juicy_token");return!!n&&(t=e.decodeToken(n),!!t)}function c(){var o,a=localStorage.getItem("juicy_token");return a?(o=e.decodeToken(a),t.get(n.api+"v1/users/"+o.id)):i.all("")}var s={uploadImage:o,isAdmin:a,isUser:r,getCurrentUser:c};return s}e.$inject=["jwtHelper","$http","APP_CONST","$q"],angular.module("app").service("appService",e)}(),function(){angular.module("app.components",["angularGrid","duScroll","infinite-scroll"])}(),function(){angular.module("app.modules",["angularGrid","duScroll","angular-jwt","ng-showdown","flow"])}(),function(){function e(e){function t(e,t,n,i){e.vm.content=i.content,e.vm.showDst=i.showDst,e.vm.utcCn=i.utcCn,e.vm.isAdmin=i.isAdmin,e.vm.hideProgress=i.hideProgress,e.vm.refreshInit()}function n(t,n){function i(){angular.isUndefined(e)||angular.isUndefined(e.cards)||!c.content.init||e.cards.refresh()}function o(e){var t=n("date")(new Date(e),"yyyy-MM-dd HH:mm:ss",a(e));return c.showDst&&(t+="+0100"===a(e)?" Winter Time":" Summer Time"),t}function a(e){if(!angular.isUndefined(e))return e=new Date(e),e>new Date(14275872e5)&&e<new Date(14457312e5)||e>new Date(13961376e5)&&e<new Date(14142816e5)?"+0200":c.utcCn?"+0800":"+0100"}var r,c=this;c.timeMessage="",c.refreshInit=i,r=t.$watch("vm.content.time",function(e){c.timeMessage=o(e),r()})}n.$inject=["$scope","$filter"];var i={controller:n,controllerAs:"vm",templateUrl:"components/card/card-content.tmpl.html",scope:{},require:"^^jcCard",link:t,bindToController:!0};return i}e.$inject=["angularGridInstance"],angular.module("app.components").directive("jcCardContent",e)}(),function(){function e(){function e(e,t,n,i){e.cardCtrl=i,e.vm.content=i.content,e.vm.appEvent.subscribe("card_update_"+e.vm.content._id,e.vm.handleUpdate,e)}function t(e,t,n,i,o){function a(){e.cardCtrl.deleted=!0,t.publish("deleteBeats",u.content._id)}function r(){t.publish("modifyBeats",u.content)}function c(){t.publish("comment",u.content)}function s(){i.postComment(u.content._id,u.newComment)}function l(e,t){u.content=t,o.cards&&o.cards.refresh()}var u=this;u.deleteBeats=a,u.modifyBeats=r,u.submitComment=s,u.comment=c,u.isUser=n.isUser(),u.isAdmin=n.isAdmin(),u.appEvent=t,u.handleUpdate=l,u.newComment={body:""}}t.$inject=["$scope","appEvent","appService","beatsService","angularGridInstance"];var n={controller:t,controllerAs:"vm",templateUrl:"components/card/card-control.tmpl.html",require:"^^jcCard",scope:{},link:e,bindToController:!0};return n}angular.module("app.components").directive("jcCardControl",e)}(),function(){function e(){function e(e,t){var n=this;n.deleted=!1,n.prod=e.production,n.isAdmin=t.isAdmin()}e.$inject=["APP_CONST","appService"];var t={controller:e,controllerAs:"vm",templateUrl:"components/card/card.tmpl.html",scope:{content:"=jcContent",showDst:"@jcShowDst",utcCn:"@jcShowUtcCn",hideCtrl:"@jcHideCtrl",hideProgress:"@jcHideProgress"},bindToController:!0};return t}angular.module("app.components").directive("jcCard",e)}(),function(){function e(e){function t(e,t,n,i){function o(){p.customRefreshEnabled?(p.displayedDataMirror=p.data,p.displayedData=t("filter")(p.displayedDataMirror,c)):a()}function a(){var e=!0;p.displayedData=[],g=[],f=0,s(d,e)}function r(e,t){for(var n=0;n<p.displayedData.length;n++)if(p.displayedData[n].time===t)return p.displayedData.splice(n,1),void f--}function c(e){var t,n;return null==e.featured&&(e.featured=!1),null==e.safe&&(e.safe=!0),t=!p.featuredOnly||p.featuredOnly&&e.featured,n=!p.safeOnly||p.safeOnly&&e.safe,t&&n}function s(e,t){for(var n=0;n<e;n++){if(null==p.data||null==p.data[f])return;t&&(p.data[f].init=!0),g.push(p.data[f]),c(p.data[f])?p.displayedData.push(p.data[f]):n--,f++}}function l(){p.customRefreshEnabled?p.customRefresh():s(m)}function u(e){return function(i,o){1!=o&&(o=!1),p[e]=o,n.cards.refresh(),s(m),p.displayedData=t("filter")(g,c)}}var p=this,d=p.initialCard?parseInt(p.initialCardNum,10):15,m=p.newCardPerPage?parseInt(p.newCardPerPage,10):6,f=0,g=[];p.displayedData=[],p.loadMore=l,p.featuredOnly=!1,p.safeOnly=!0,i.subscribe("toggleFeatured",u("featuredOnly"),e),i.subscribe("toggleWeired",u("safeOnly"),e),i.subscribe("deleteData",r,e),e.$watchCollection("vm.data",function(){p.data&&p.data.length&&o()},!0),e.$on("$repeatFinished",function(e,t){n.cards.refresh()})}t.$inject=["$scope","$filter","angularGridInstance","appEvent"];var n={controller:t,controllerAs:"vm",templateUrl:"components/masonry-cards/masonry-cards.view.html",scope:{data:"=jcData",initialCardNum:"@jcInitNum",newCardPerPage:"@jcRefreshNum",customRefresh:"=jcCustomRefresh",customRefreshEnabled:"=jcCustomRefreshEnabled"},bindToController:!0};return n}e.$inject=["$q"],angular.module("app.modules").directive("jcMasonryCards",e)}(),function(){function e(e){return function(t,n){var i=angular.element(e),o=function(){t.winWidth=i.width()};i.bind("resize",function(){o()}),o()}}e.$inject=["$window"],angular.module("app.components").directive("resize",e)}(),function(){function e(e){function t(e,t,n,i,o,a,r){function c(e){a.go(e)}var s=this;s.state=a,s.appTitle=o.title,s.appVersion=o.version,s.navs=n("orderBy")(e.navConfig,"order",!0),s.gotoState=c}t.$inject=["jcNav","$scope","$filter","appEvent","APP_CONST","$state","$rootScope"];var n={controller:t,controllerAs:"vm",templateUrl:"components/nav/nav.tmpl.html",bindToController:!0};return n}e.$inject=["$state"],angular.module("app.components").directive("jcNav",e)}(),function(){function e(){function e(e){angular.forEach(e,function(e){t(e)})}function t(e){n.push(e)}var n=[];this.$get=function(){return{addMenu:e,navConfig:n}}}angular.module("app").provider("jcNav",e)}(),function(){function e(){function e(e,t,n,i){e.vm.settings=i.settings}function t(e){function t(t){e.publish(t.event,t.value)}var n=this;n.handleSettings=t}t.$inject=["appEvent"];var n={controller:t,controllerAs:"vm",require:"^jcSubNav",link:e,templateUrl:"components/sub-nav/sub-nav-settings.tmpl.html",bindToController:!0};return n}angular.module("app.components").directive("jcSubNavSettings",e)}(),function(){function e(){function e(e,t,n,i){e.subNavCtrl=i}function t(e,t,n,i,o){function a(){t.scrollTop(63.9,2e3)}function r(e){a(),n.go(e.state,e.stateParam),o.publish("jcSubNavSectionSwitched",e)}var c=this;c.displaySection=r,c.displaySettings=!1}t.$inject=["$rootScope","$document","$state","$scope","appEvent"];var n={controller:t,controllerAs:"vm",templateUrl:"components/sub-nav/sub-nav-tabs.tmpl.html",require:"^jcSubNav",link:e,bindToController:!0};return n}angular.module("app.components").directive("jcSubNavTabs",e)}(),function(){function e(){function e(e,t){var n=this;n.displaySettings=!1}e.$inject=["$scope","appEvent"];var t={controller:e,controllerAs:"vm",templateUrl:"components/sub-nav/sub-nav.tmpl.html",scope:{sections:"=jcSections",active:"=jcActive",settings:"=jcSettings"},bindToController:!0};return t}angular.module("app.components").directive("jcSubNav",e)}(),function(){function e(){function e(e,t,n,i,o){function a(){void 0!==l.jcTopic&&(l.jcTopicBrief||(l.jcTopic.html=t.makeHtml(l.jcTopic.content)))}function r(e){o.publish("topicSelected",{id:e})}function c(e){o.publish("editTopic",{id:e})}function s(){l.nowUrl="https://src.moe/#"+n.url(),function(t,n,i){function o(){window.open(""+a+c,"mb","toolbar=0,status=0,resizable=1,width=620,height=450,left="+(t.width-620)/2+",top="+(t.height-450)/2)||(r.href=""+a+c)}try{}catch(i){}var a="http://v.t.sina.com.cn/share/share.php?",r=e.nowUrl,c="url="+i(r)+"&title="+i(l.jcTopic.title)+"&pic="+i(l.jcTopic.thumbnail);/Firefox/.test(navigator.userAgent)?setTimeout(o,0):o()}(screen,document,encodeURIComponent)}var l=this;l.selectTopic=r,l.share=s,l.editTopic=c,l.isAdmin=i.isAdmin(),a(),e.$watch("vm.jcTopic",function(){l.jcTopic&&a()},!0)}e.$inject=["$scope","$showdown","$location","appService","appEvent"];var t={controller:e,controllerAs:"vm",scope:{jcTopic:"=",jcTopicBrief:"=",jcTopicShare:"=",jcShadowDisabled:"="},templateUrl:"components/topic-card/topic-card.view.html",bindToController:!0};return t}angular.module("app.components").directive("jcTopicCard",e)}(),function(){function e(){var e=this;e.aboutData=[{title:"Road to V3",time:1468342287378,text:"TODO:(V3)Analysis module to add in further releases(optional)\nTODO:(V3)Unit Tests\nTODO:(V3+)Angular 2",featured:!0},{title:"v2 alpha5",time:1468604591080,text:"Comment, Avatar",featured:!0},{title:"v2 alpha4",time:1468342287378,text:"Bug Fixes, Baladeur, Comment Init",featured:!1},{title:"v2 alpha3",time:1468066126860,text:"Gulp, Babel, Minify",featured:!1},{title:"v2 alpha2",time:1467907913966,text:"Redis Cache , Links module",featured:!1},{title:"v2 alpha1",time:1467733803777,text:"Image Uploading , Beats and Topics editing , bug fixes",featured:!1},{title:"v2 alpha0",time:1467649952611,text:"Topic Modules with Markdown , ExpressJS Backend and UserLogin",featured:!1},{title:"AngularJS Libs",time:1456420305e3,text:"Modified Angular-materialize(including Materialize)\nModified Angular-grid by s-yadav (https://github.com/s-yadav/angulargrid)",featured:!1},{title:"About Me",time:1456420305e3,text:"Author : POJOa\nSite : http://src.moe/",featured:!1},{title:"v1.5",time:1458114983e3,text:"Multiple Bug Fixes For Recent Tab",featured:!1},{title:"v1.4.2",time:1458012771e3,text:"Ready For Express Backend\nAdded Recent Column\nThe Filter In Recent Column Currently Won't Work",featured:!1},{title:"v1.4.1",time:1457162347e3,text:"Initialization of Compose Module",featured:!1},{title:"Stable Release v1.4 (Nozomi)",time:1456751208e3,text:"Optimized performance",featured:!0},{title:"v1.4 RC1 2016.02.28",time:1456675603e3,text:"Nozomi is a Stable Version Milestone , from then I'll create a backend in express for it.\nOptimized Documentation.\nRenewed Card Style\nRefractor and Added Navbar Order\nRefresh Policy Change",featured:!1},{title:"v1.3 2016.02.25",time:1456420305e3,text:"Heavy Refractor of Card/Cards View and components\nUpdated angular-grid\nSolved various tiny bugs\n",featured:!1},{title:"v1.2 2016.02.24",time:14562432e5,text:"Refractor jcSubNav\nEnhancement of Picture Displaying\nDisabled Slider (will be taken into account after next major release)\nAdded App Drawer For Mobile Devices\n"},{title:"v1.1 2016.02.23",time:14561568e5,text:"Added Navbar Customize Configuration Provider\nAdded Event Service.\nFixed (and disabled) Card Control.\nFixed Navbar Bug , added version badge.\nMinimalized data for Github."},{title:"Release v1 2016.02.13",time:14552928e5,text:"Adjust Navbar Style.\nAdded Loading Bar.\nSpecified Feature Cards.\n",featured:!0},{title:"Pre-release 2016.02.12",time:14552064e5,text:"Fixed height issue."},{title:"v0.4 2016.02.11",time:145512e7,text:"Unlimited Refreshing! Featured Filter!!"},{title:"v0.3 2016.02.10",time:14550336e5,text:"Added Cascade Displaying , switched to UI-Router"},{title:"v0.2 2016.02.09",time:14549472e5,text:"Built Project Skeleton , added cascade displaying"},{title:"v0.1 2016.02.08",time:14548608e5,text:"Simplified JSON structure"}]}angular.module("app.modules").controller("aboutCtrl",e)}(),function(){function e(e){e.$get().addMenu([{title:"Logs",state:"about",order:15}])}e.$inject=["jcNavProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i,o,a,r,c,s,l){function u(){}function p(){c.postBaladeur(T.newBaladeur).then(function(){return T.newBaladeur={createdAt:(new Date).getTime(),description:"Description goes here",genre:"Alt.Rock",image:[],emo:0,express:0,ids:[],title:"Title goes Here",artist:"Artist goes Here"}})}function d(e){T.newBaladeur=angular.copy(e),T.newBaladeur.ids=T.newBaladeur.ids.join(",")}function m(){b()}function f(e,t,n){r.uploadImage(n.files[0].file).success(function(e){return T.newBaladeur.image[0]="http://ww4.sinaimg.cn/large/"+e.pid})}function g(){T.settings.current="moe",h(T.settings)}function v(){T.settings.current="all",h(T.settings)}function h(){console.log("reinit"+T.settings),T.baladeurList=[],T.lock=!1,T.pageForCustomRefresh=0,b()}function b(){var e=T.pageForCustomRefresh*S;w&&(S=C),T.lock||(T.lock=!0,$(e,S,T.settings).success(function(e){e&&e.length?(angular.forEach(e,function(e){e.init=w,T.baladeurList||(T.baladeurList=[]),T.baladeurList.push(e)}),T.pageForCustomRefresh++,T.lock=!1):T.lock=!0,w=!1}))}var $,w,C,S,T=this;window.alert=null,T.playConfig={autoPlay:!1,size:"normal",fold:!0},T.newBaladeur={createdAt:(new Date).getTime(),description:"Description goes here",genre:"Alt.Rock",image:["1.jpg"],emo:0,express:0,ids:[],title:"Title goes Here",artist:"Artist goes Here"},T.choices=[0,1,2],T.baladeurList=[],T.start=0,T.reachedEnd=!1,T.lock=!1,T.loadMore=m,T.upload=f,T.submit=p,T.edit=d,T.moe=g,T.all=v,T.settings={emo:{neg:!0,soso:!0,pos:!0},express:{neg:!0,soso:!0,pos:!0},current:"all"},T.isAdmin=r.isAdmin(),T.pageForCustomRefresh=0,$=c.fetchBySkipAndLimit,w=!0,C=3,S=3,u(),e.$watch("vm.settings",h,!0)}e.$inject=["$scope","$http","$state","$window","$document","appEvent","appService","baladeurService","jwtHelper","beatsService"],angular.module("app.modules").controller("baladeurCtrl",e)}(),function(){function e(e,t){e.$get().addMenu([{title:"Baladeur♪",state:"baladeur",order:10}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/baladeurs")}function a(t){return e["delete"](i.api+"v1/baladeurs/"+t)}function r(t,n,o){function a(e){var t={express:{$in:[0,1,2]},emo:{$in:[0,1,2]}};return o.emo.neg||t.emo.$in.splice(t.emo.$in.indexOf(0),1),o.emo.soso||t.emo.$in.splice(t.emo.$in.indexOf(1),1),o.emo.pos||t.emo.$in.splice(t.emo.$in.indexOf(2),1),o.express.neg||t.express.$in.splice(t.express.$in.indexOf(0),1),o.express.soso||t.express.$in.splice(t.express.$in.indexOf(1),1),o.express.pos||t.express.$in.splice(t.express.$in.indexOf(2),1),e&&(t.genre={$regex:"[Mm]oe"}),JSON.stringify(t)}var r=a("moe"===o.current);return e.get(i.api+"v1/baladeurs?sort=-time&populate=tags&skip="+t+"&limit="+n+"&query="+r)}function c(t,n,o){return e.get(i.api+"v1/baladeurs?sort=-time&populate=tags&skip="+t+"&limit="+n+'&query={"genre":{"$regex":"[Mm]oe"}}')}function s(t){return t.emo=parseInt(t.emo,10),t.express=parseInt(t.express,10),t.ids=t.ids.split(",").map(function(e){return parseInt(e,10)}),t._id?e.patch(i.api+"v1/baladeurs/"+t._id,t):e.post(i.api+"v1/baladeurs",t)}var l={fetchAll:o,fetchBySkipAndLimit:r,deleteOne:a,postBaladeur:s,fetchBySkipAndLimitMoe:c};return l}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("baladeurService",e)}(),function(){function e(e,t,n,i,o,a,r,c,s,l,u){function p(){var e=O.pageForCustomRefresh*N;_&&(N=U),O.lock||(O.lock=!0,l.fetchBySkipAndLimit(e,N).success(function(e){e&&e.length?(angular.forEach(e,function(e){e.init=_,O.selectedBeats.beats||(O.selectedBeats.beats=[]),O.selectedBeats.beats.push(e)}),O.pageForCustomRefresh++,O.lock=!1):O.lock=!0,_=!1}))}function d(){i.scrollTop(0,2e3)}function m(e,t){O.newBeat=t}function f(e,t){l.deleteOne(t)}function g(e){return O.currentSelectedMonth=e,O.currentSelectedTab=v(e),l.fetchByMonth(e,1).success(function(e){O.selectedBeats=e})}function v(e){return{title:w(e),state:"beats.specified",stateParam:{month:e}}}function h(){c.fetchBySkipAndLimit(0,3).success(function(e){return O.topicList=e}),b().then(function(e){O.tabs=e,null!=n.params.month?(O.customRefreshEnabled=!1,g(n.params.month)):(O.customRefreshEnabled=!0,p())})}function b(){var e=[{title:"Recent",state:"beats"}];return l.fetchAvailableMonths().then(function(t){return angular.forEach(t.data,function(t){e.push({title:w(t),state:"beats.specified",stateParam:{month:t}})}),e})}function $(e,t){O.lock=!1,t.stateParam&&t.stateParam.month?(O.selectedBeats=[],g(t.stateParam.month),O.customRefreshEnabled=!1):(O.selectedBeats=[],O.pageForCustomRefresh=0,O.customRefreshEnabled=!0,p())}function w(e){var t=e.substring(0,2),n=e.substring(2,4);return n+"/"+t}function C(e,t){n.go("topics-detail",t)}function S(){l.postBeat(O.newBeat)}function T(e,t){n.go("compose-edit",t)}function j(e,t){O.newComment.beat=t._id}function y(e,t,n){a.uploadImage(n.files[0].file).success(function(e){return O.newBeat.image.push("http://ww4.sinaimg.cn/large/"+e.pid)})}function A(){r.fetchByName(O.newTag.name).success(function(e){e[0]&&e[0]._id?k(e[0]):r.postTag(O.newTag).success(function(e){return k(e)})})}function k(e){var t,n=!1;for(null==O.newBeat.tags&&(O.newBeat.tags=[]),t=0;t<O.newBeat.tags.length;t++)if(n=O.newBeat.tags[t]._id===e._id){O.newBeat.tags[t]=e;break}n||O.newBeat.tags.push(e),O.newTag={name:"Tag Name Goes Here","class":"blue"}}function B(e){O.newTag=angular.copy(e)}function P(e){r.deleteOne(e._id)}function x(){var e=angular.copy(O.newComment.beat);return delete O.newComment.beat,l.postComment(e,O.newComment).success(function(t){return o.publish("card_update_"+e,t)})}var O=this,N=6,U=15,_=!0;O.isAdmin=a.isAdmin(),O.upload=y,O.submitBeat=S,O.addTag=A,O.modifyTag=B,O.deleteTag=P,O.newComment={},O.newTag={name:"Tag Name Goes Here","class":"blue"},O.newBeat={text:"",featured:!1,safe:!0,tags:null},O.customRefreshEnabled=!1,O.monthNeeded=[],O.tabs=[],O.lock=!1,O.selectedBeats=[],O.currentSelectedTab={},O.jcSubNavSettings=[{type:"toggle",title:"Featured Only",value:!1,event:"toggleFeatured"},{type:"toggle",title:"Hide Selfie",value:!0,event:"toggleWeired"}],O.getBeatOfMonth=g,O.scrollTop=d,O.pushBeatsPaginated=p,O.submitComment=x,O.pageForCustomRefresh=0,h(),o.subscribe("jcSubNavSectionSwitched",$,e),o.subscribe("modifyBeats",m,e),o.subscribe("deleteBeats",f,e),o.subscribe("topicSelected",C,e),o.subscribe("editTopic",T,e),o.subscribe("comment",j,e)}e.$inject=["$scope","$http","$state","$document","appEvent","appService","tagsService","topicsService","jwtHelper","beatsService","angularGridInstance"],angular.module("app.modules").controller("beatsCtrl",e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/beats")}function a(t){return e["delete"](i.api+"v1/beats/"+t)}function r(t,n){return e.get(i.api+'v1/beats?sort=-time&populate=[{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]&skip='+t+"&limit="+n)}function c(t,n){return e.get(i.api+"beats/yymm/"+t+"/duration/"+n)}function s(){return e.get(i.api+"beats/months")}function l(t){return t._id?e.patch(i.api+"v1/beats/"+t._id,t):e.post(i.api+"v1/beats",t)}function u(t,n){return e.post(i.api+"beats/"+t+"/comment",n)}var p={fetchAll:o,fetchByMonth:c,fetchBySkipAndLimit:r,fetchAvailableMonths:s,deleteOne:a,postBeat:l,postComment:u};return p}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("beatsService",e)}(),function(){function e(e,t,n,i,o,a,r,c){function s(){g.topicId&&r.fetchOne(g.topicId).success(function(e){return g.newTopic=e[0]})}function l(){r.postTopic(g.newTopic)}function u(e,t,n){a.uploadImage(n.files[0].file).success(function(e){return g.newTopic.content+="![image](http://ww4.sinaimg.cn/large/"+e.pid+")"})}function p(){c.fetchByName(g.newTag.name).success(function(e){e[0]&&e[0]._id?d(e[0]):c.postTag(g.newTag).success(function(e){return d(e)})})}function d(e){var t,n=!1;for(null==g.newTopic.tags&&(g.newTopic.tags=[]),t=0;t<g.newTopic.tags.length;t++)if(n=g.newTopic.tags[t]._id===e._id){g.newTopic.tags[t]=e;break}n||g.newTopic.tags.push(e),g.newTag={name:"Tag Name Goes Here","class":"blue"}}function m(e){g.newTag=angular.copy(e)}function f(e){c.deleteOne(e._id)}var g=this;g.submitTopic=l,g.upload=u,g.addTag=p,g.modifyTag=m,g.deleteTag=f,g.topicId=n.params.id,g.newTopic={title:"Topic Title Here",content:"",featured:!1,tags:[]},g.newTag={name:"Tag Name Goes Here","class":"blue"},s()}e.$inject=["$scope","$http","$state","$document","appEvent","appService","topicsService","tagsService"],angular.module("app.modules").controller("composeCtrl",e)}(),function(){function e(e,t){t.$get().isAdmin()&&e.$get().addMenu([{title:"Compose",state:"compose",order:13}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/tags")}function a(t){return e["delete"](i.api+"v1/tags/"+t)}function r(t){return e.get(i.api+'v1/tags?query={"name":"'+t+'"}')}function c(t){return e.get(i.api+"v1/tags/"+t)}function s(t){return t._id?e.patch(i.api+"v1/tags/"+t._id,t):e.post(i.api+"v1/tags",t)}var l={fetchAll:o,fetchByName:r,deleteOne:a,postTag:s,fetchById:c};return l}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("tagsService",e)}(),function(){function e(e,t,n,i,o,a,r,c){function s(){f.isAdmin=r.isAdmin(),c.fetchAll().success(function(e){return f.links=e})}function l(e,t,n){r.uploadImage(n.files[0].file).success(function(e){return f.newLink.img="http://ww4.sinaimg.cn/large/"+e.pid})}function u(e){i.open(e)}function p(){c.postLink(f.newLink)}function d(e){f.newLink=e}function m(e){c.deleteOne(e._id)}var f=this;f.upload=l,f.open=u,f.submit=p,f.modify=d,f.del=m,f.isAdmin=!1,f.links=[],f.newLink={title:"New Link Title",description:"Site Description",img:"Image URL",alias:"Owner's Nickname",color:"Experimental Tag Color Picker",href:"Link Goes Here"},s()}e.$inject=["$scope","$http","$state","$window","$document","appEvent","appService","linksService"],angular.module("app.modules").controller("linksCtrl",e)}(),function(){function e(e,t){e.$get().addMenu([{title:"Friends!",state:"links",order:1}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/links")}function a(t){return e["delete"](i.api+"v1/links/"+t)}function r(t,n){return e.get(i.api+"v1/links?sort=-time&skip="+t+"&limit="+n)}function c(t){return t._id?e.patch(i.api+"v1/links/"+t._id,t):e.post(i.api+"v1/links",t)}var s={fetchAll:o,fetchBySkipAndLimit:r,deleteOne:a,postLink:c};return s}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("linksService",e)}(),function(){function e(e,t,n,i,o,a,r,c){function s(){c.getCurrentUser().then(function(e){return f.currentUser=e.data})}function l(){r.login(f.userLogin).success(u).error(function(e){return r.reg(f.userLogin).success(u)})}function u(e){"string"==typeof e&&localStorage.setItem("juicy_token",e),s()}function p(e,t,n){c.uploadImage(n.files[0].file).success(function(e){return f.currentUser.avatar="http://ww4.sinaimg.cn/large/"+e.pid})}function d(){r.evict()}function m(){r.updateUser(f.currentUser)}var f=this;f.loginOrReg=l,f.evict=d,f.userLogin={username:"",password:""},f.currentUser={},f.updateUser=m,f.upload=p,s()}e.$inject=["$scope","$http","$state","$document","appEvent","jwtHelper","loginService","appService"],angular.module("app.modules").controller("loginCtrl",e)}(),function(){function e(e,t){e.$get().addMenu([{title:"Login",state:"login",order:14}])}e.$inject=["jcNavProvider","appServiceProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(t){return e({url:i.api+"user/login",dataType:"json",method:"POST",data:t,headers:{"Content-Type":"application/json"}})}function a(t){return e({url:i.api+"user/reg",dataType:"json",method:"POST",data:t,headers:{"Content-Type":"application/json"}})}function r(t){return e.patch(i.api+"v1/users/"+t._id,t)}function c(){return e.get(i.api+"evictCache")}var s={login:o,reg:a,evict:c,updateUser:r};return s}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("loginService",e)}(),function(){function e(e,t,n,i,o,a,r){function c(){u.topicId||n.go("beats"),r.fetchOne(u.topicId).success(function(e){return u.topicData=e[0]})}function s(e,t){n.go("compose-edit",t)}function l(){return r.postComment(u.topicId,u.newComment).success(function(e){return u.topicData=e})}var u=this;u.topicData={},u.topicId=n.params.id,u.submitComment=l,u.isUser=a.isUser(),c(),o.subscribe("editTopic",s,e)}e.$inject=["$scope","$http","$state","$document","appEvent","appService","topicsService"],angular.module("app.modules").controller("topicsDetailCtrl",e)}(),function(){function e(e,t,n,i,o,a){function r(){c()}function c(){var e=m.pageForCustomRefresh*d;u&&(d=p),m.lock||(m.lock=!0,a.fetchBySkipAndLimit(e,d).success(function(e){e&&e.length?(angular.forEach(e,function(e){e.init=u,m.topicList||(m.topicList=[]),m.topicList.push(e)}),m.pageForCustomRefresh++,m.lock=!1):m.lock=!0,u=!1}))}function s(e,t){n.go("topics-detail",t)}function l(e,t){n.go("compose-edit",t)}var u,p,d,m=this;m.topicList=[],m.start=0,m.reachedEnd=!1,m.lock=!1,m.loadMore=r,m.pageForCustomRefresh=0,u=!0,p=3,d=3,o.subscribe("topicSelected",s,e),o.subscribe("editTopic",l,e)}e.$inject=["$scope","$http","$state","$document","appEvent","topicsService"],angular.module("app.modules").controller("topicsCtrl",e)}(),function(){function e(e){e.$get().addMenu([{title:"Topics",state:"topics",order:5}])}e.$inject=["jcNavProvider"],angular.module("app").config(e)}(),function(){function e(e,t,n,i){function o(){return e.get(i.api+"v1/topics&populate=tags")}function a(t,n){return e.get(i.api+"v1/topics?sort=-createdAt&skip="+t+"&limit="+n+"&select=_id,title,featured,createdAt,summary,content,tags&populate=tags")}function r(t){return e.get(i.api+'v1/topics?query={"_id":"'+t+'"}&populate=[{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]')}function c(t,n){return e.get(i.api+"topics/yymm/"+t+"/duration/"+n)}function s(){return e.get(i.api+"topics/months")}function l(t){return t._id?e.patch(i.api+"v1/topics/"+t._id,t):e.post(i.api+"v1/topics",t)}function u(t,n){return e.post(i.api+"topic/"+t+"/comment",n)}var p={fetchAll:o,fetchByMonth:c,fetchBySkipAndLimit:a,fetchAvailableMonths:s,fetchOne:r,postTopic:l,postComment:u};return p}e.$inject=["$http","$state","$document","APP_CONST"],angular.module("app.modules").service("topicsService",e)}();