var Util = require('../../util')();
var Promise = require('bluebird');
var Comment = require('../../domain/comment/model');
var Beats = require('../../domain/beat/model');
var Topic = require('../../domain/topic/model');
var cachegoose = require('cachegoose');

function commentRest(api){
    api.post('/beats/:id/comment', function(req, res) {
        var comment = req.body;
        cachegoose._cache.clear();

            if(comment._id && comment.user[0]!==req.user._id){
                return res.sendStatus(401);
            }
            comment.user = [req.user.id];
            var c = new Comment(comment);

            c.save()
                .then(g=>Beats.findOneAndUpdate({_id: req.params.id},{$push:{comments:g._id}}).exec())
                .then(i=>res.json(i))
                .catch(err=>console.log(err));
    });
    
    api.post('/topic/:id/comment', function(req, res) {
        var comment = req.body;
        cachegoose._cache.clear();

        if(comment._id && comment.user[0]!==req.user._id){
            return res.sendStatus(401);
        }
        comment.user = [req.user.id];
        var c = new Comment(comment);

        c.save()
            .then(g=>Topic.findOneAndUpdate({_id: req.params.id},{$push:{comments:g}}).exec())
            .then(i=>res.json(i))
            .catch(err=>console.log(err));
    });
}



module.exports = commentRest;
