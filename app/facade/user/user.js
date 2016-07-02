var Util = require('../../util/index')();
var Promise = require('bluebird');
var User = require('../../domain/user/model');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var fs = require('fs');

function userRest(api){
    api.post('/login', function(req, res) {
         User.find({'username':req.body.username}).exec(r=>{
             if(!r)
        {
            return res.sendStatus(403);

        }
                bcrypt.compare(req.body.password, r.password,function(err,authorized){
                if(authorized){
                    res.json(jwt.sign({id: user._id,isAdmin: user.isAdmin}, 'shhhhh'));
                }
            })


    })});

    api.post('/reg', function(req, res) {
        var u = new User();
        u.username = req.body.username;
        bcrypt.hash(req.body.password, 'shhhhh', function(err, hash) {
            u.password = hash;
            u.isAdmin = false;
            u.save(
                (err, user, numAffected)=>
                {
                    res.json(jwt.sign({id: u._id,isAdmin: u.isAdmin}, 'shhhhh'));

                });
        });
    });
}


module.exports = userRest;
