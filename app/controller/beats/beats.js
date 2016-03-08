function beatsCtrl(api){
    // home page route (http://localhost:8080)
    api.get('/', function(req, res) {
        res.send('write logic of /beats root');
    });

    // about page route (http://localhost:8080/about)
    api.get('/about', function(req, res) {
        res.send('write logic of /beats/about');
    });
}

module.exports = beatsCtrl;
