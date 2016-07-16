(function() {
    angular.module('app.modules')
        .controller('baladeurCtrl', baladeurCtrl);

    function baladeurCtrl($scope, $http, $state, $window,$document, appEvent, appService,baladeurService, jwtHelper, beatsService) {

        var vm = this;
        window.alert = null;
        vm.playConfig={
            autoPlay: false, // 表示是否自动播放
            size: 'normal', // 表示正在播放歌曲的面板大小，normal表示标准大小，small表示小面板
            fold: true // 表示歌曲列表是否展开
        };
        vm.newBaladeur={
            createdAt: new Date().getTime(),
            description: "Description goes here",
            genre: "Alt.Rock",
            image: ['1.jpg'],
            emo: 0,
            express: 0,
            ids:[],
            title: "Title goes Here",
            artist: "Artist goes Here"
        };
        vm.choices = [0,1,2];

        vm.baladeurList = [];
        vm.start = 0;
        vm.reachedEnd = false;
        vm.lock = false;
        vm.loadMore = loadMore;
        vm.upload = upload;
        vm.submit = submit;
        vm.edit = edit;
        vm.moe = moe;
        vm.all = all;
        vm.settings={
            emo:{
                neg:true,
                soso:true,
                pos:true
            },
            express:{
                neg:true,
                soso:true,
                pos:true
            },
            current:"all"
        };

        vm.isAdmin = appService.isAdmin();
        vm.pageForCustomRefresh = 0;
        var currentPaginationFunction = baladeurService.fetchBySkipAndLimit;

        var paginationInit = true;
        var paginationInitBaladeurNum = 3;
        var baladeurPerPage = 3;
        

        init();
        $scope.$watch('vm.settings',reinit,true);

        ///////////////////

        function init(){
        }


        function submit(){
            baladeurService.postBaladeur(vm.newBaladeur).then(()=>vm.newBaladeur={
                createdAt: new Date().getTime(),
                description: "Description goes here",
                genre: "Alt.Rock",
                image: [],
                emo: 0,
                express: 0,
                ids:[],
                title: "Title goes Here",
                artist: "Artist goes Here"
            });

        }
        
        function edit(baladeur){
            vm.newBaladeur = angular.copy(baladeur);
            vm.newBaladeur.ids = vm.newBaladeur.ids.join(',');

        }
        function loadMore() {
            pushBaladeurPaginated();

        }

        function upload($files, $event, $flow) {
            appService.uploadImage($flow.files[0].file)
                .success(data=>vm.newBaladeur.image[0]='http://ww4.sinaimg.cn/large/' + data.pid);
        }

        function moe(){
            vm.settings.current="moe";
            reinit(vm.settings);
        }

        function all(){
            vm.settings.current="all";
            reinit(vm.settings);
        }
        function reinit(){
            console.log('reinit' + vm.settings);
            vm.baladeurList = [];
            vm.lock = false;
            vm.pageForCustomRefresh = 0;
            pushBaladeurPaginated();
        }
        function pushBaladeurPaginated() {
            var skipCount = vm.pageForCustomRefresh * baladeurPerPage;
            if (paginationInit) {
                baladeurPerPage = paginationInitBaladeurNum;
            }
            if (!vm.lock) {
                vm.lock = true;
                currentPaginationFunction(skipCount, baladeurPerPage,vm.settings).success(res=> {
                    if (res && res.length) {
                        angular.forEach(res, r => {
                                r.init = paginationInit;
                                if (!vm.baladeurList) {
                                    vm.baladeurList = [];
                                }
                                vm.baladeurList.push(r);
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
    }
})();