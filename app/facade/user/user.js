var Util = require('../../util/index')();
var Promise = require('bluebird');
var User = require('../../domain/user/model');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var fs = require('fs');
var cert = fs.readFileSync('private.key');

function userRest(api){
    api.post('/login', function(req, res) {
        var u = User.findOne({'username':req.body.username}).exec().then(r=>{
                bcrypt.compare(req.body.password, r.password,function(err,authorized){
                if(authorized){
                    res.json(jwt.sign({id: user._id,isAdmin: user.isAdmin}, 'shhhhh'));
                }
            })
            });

    });
    api.post('/reg', function(req, res) {
        var u = new User();
        u.username = req.body.username;
        bcrypt.hash(req.body.password, 'shhhhh', function(err, hash) {
            u.password = hash;
            u.isAdmin = false;
            u.save(
                (err, user, numAffected)=>
                {
                    res.json(jwt.sign({id: user._id,isAdmin: user.isAdmin}, 'shhhhh'));

                });
        });
    });
}


module.exports = userRest;
