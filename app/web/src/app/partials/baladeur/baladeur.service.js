(function() {
    angular.module('app.modules')
        .service('baladeurService', baladeurService);

    function baladeurService($http, $state, $document, APP_CONST) {
        var service = {
            fetchAll: fetchAll,
            fetchBySkipAndLimit: fetchBySkipAndLimit,
            deleteOne: deleteOne,
            postBaladeur: postBaladeur
        };
        
        return service;

        function fetchAll() {
            return $http.get(APP_CONST.api + 'v1/baladeurs');
        }

        function deleteOne(id) {
            return $http.delete(APP_CONST.api + 'v1/baladeurs/' + id);
        }

        function fetchBySkipAndLimit(skip, limit) {
            return $http.get(APP_CONST.api + 'v1/baladeurs?sort=-time&populate=tags&&skip=' + skip + '&limit=' + limit);
        }

        function postBaladeur(baladeur) {
            baladeur.emo = parseInt(baladeur.emo, 10);
            baladeur.express = parseInt(baladeur.express, 10)
            baladeur.ids = baladeur.ids.map(i => parseInt(i, 10));
            if (!baladeur._id) {
                return $http.post(APP_CONST.api + 'v1/baladeurs', baladeur);
            } else {
                return $http.patch(APP_CONST.api + 'v1/baladeurs/' + baladeur._id, baladeur);
            }
        }


    }
})();