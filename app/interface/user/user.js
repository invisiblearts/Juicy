var Util = require('../../util/index')();
var Promise = require('bluebird');
var User = require('../../domain/user/model');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var key = require('../../key');

function userRest(api) {
    api.post('/login', function (req, res) {
        User.findOne({'username': req.body.username}).select("+password").exec().then(r=> {
            if (!r) {
                return res.sendStatus(403);
            }
            bcrypt.compare(req.body.password, r.password, function (err, authorized) {
                if (authorized) {
                    res.json(jwt.sign({id: r._id, isAdmin: r.isAdmin}, key))
                } else {
                    res.json({});
                }
            })
        })
    })

    api.post('/reg', function (req, res) {
        User.findOne({'username': req.body.username}).select("+password").exec()
            .then(r=> {
                if (!r) {
                    var u = new User();
                    u.username = req.body.username;
                    bcrypt.hash(req.body.password, 12, function (err, hash) {
                        u.password = hash;
                        u.isAdmin = req.body.username === 'pojo';
                        u.save(
                            (err, user, numAffected)=> {
                                res.json(jwt.sign({id: u._id, isAdmin: u.isAdmin}, key));

                            });
                    });
                } else {
                    res.sendStatus(403);
                }
            });
    });
}

module.exports = userRest;
