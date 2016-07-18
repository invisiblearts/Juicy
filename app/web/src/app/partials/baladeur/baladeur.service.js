(function() {
    angular.module('app.modules')
        .service('baladeurService', baladeurService);

    function baladeurService($http, $state, $document, APP_CONST) {
        var service = {
            fetchAll: fetchAll,
            fetchBySkipAndLimit: fetchBySkipAndLimit,
            deleteOne: deleteOne,
            postBaladeur: postBaladeur,
            fetchBySkipAndLimitMoe:fetchBySkipAndLimitMoe
        };
        
        return service;

        function fetchAll() {
            return $http.get(APP_CONST.api + 'v1/baladeurs');
        }

        function deleteOne(id) {
            return $http.delete(APP_CONST.api + 'v1/baladeurs/' + id);
        }

        function fetchBySkipAndLimit(skip, limit,settings) {
            function genQuery(moe){
                var query = {
                    express:{$in:[0,1,2]},
                    emo:{$in:[0,1,2]},
                };
                if(!settings.emo.neg){
                    query.emo.$in.splice(query.emo.$in.indexOf(0),1);
                }
                if(!settings.emo.soso){
                    query.emo.$in.splice(query.emo.$in.indexOf(1),1);
                }
                if(!settings.emo.pos){
                    query.emo.$in.splice(query.emo.$in.indexOf(2),1);
                }
                if(!settings.express.neg){
                    query.express.$in.splice(query.express.$in.indexOf(0),1);
                }
                if(!settings.express.soso){
                    query.express.$in.splice(query.express.$in.indexOf(1),1);
                }
                if(!settings.express.pos){
                    query.express.$in.splice(query.express.$in.indexOf(2),1);
                }
                if(moe) {
                    query.genre = {$regex: "[Mm]oe"};
                }
                return JSON.stringify(query);
            }
            var query = genQuery(settings.current === 'moe');
            return $http.get(APP_CONST.api + 'v1/baladeurs?sort=-createdAt&populate=tags&skip=' + skip + '&limit=' + limit + '&query=' + query);
        }

        function fetchBySkipAndLimitMoe(skip, limit,settings) {
            return $http.get(APP_CONST.api + 'v1/baladeurs?sort=-createdAt&populate=tags&skip=' + skip + '&limit=' + limit + '&query={"genre":{"$regex":"[Mm]oe"}}');
        }

        function postBaladeur(baladeur) {
            baladeur.emo = parseInt(baladeur.emo, 10);
            baladeur.express = parseInt(baladeur.express, 10)
            baladeur.ids = baladeur.ids.split(',').map(i => parseInt(i, 10));
            if (!baladeur._id) {
                return $http.post(APP_CONST.api + 'v1/baladeurs', baladeur);
            } else {
                return $http.patch(APP_CONST.api + 'v1/baladeurs/' + baladeur._id, baladeur);
            }
        }


    }
})();