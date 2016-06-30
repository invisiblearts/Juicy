var Util = require('../../util')();
var Promise = require('bluebird');
var User = require('../../domain/user/model');
var bcrypt = require('node-bcrypt')
var jwt = require('jsonwebtoken');

function userRest(api){
    api.post('/login', function(req, res) {
        var u = User.findOne({'username':req.body.username}).exec();
        bcrypt.compare(req.body.password, u.password,function(err,authorized){
            if(authorized){
                res.json(jwt.sign({id: u._id,isAdmin: u.isAdmin},'shhhhh',{ algorithm: 'RS256'}));
            }
        })
    });
    api.post('/reg', function(req, res) {
        var u = new User();
        u.username = req.body.username;
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
            u.password = hash;
            u.isAdmin = false;
            u.save((err, user, numAffected)=>res.json(jwt.sign({id: user._id,isAdmin: user.isAdmin},'shhhhh',{ algorithm: 'RS256'})));
        })
    });
}


module.exports = userRest;
