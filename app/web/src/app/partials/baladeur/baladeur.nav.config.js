(function() {
    angular.module('app')
        .config(navConfig);

    function navConfig(jcNavProvider, appServiceProvider) {
            jcNavProvider.$get().addMenu(
                [
                    {title: '安利♪', state: 'baladeur', order: 10}
                ]
            );
    }
})();