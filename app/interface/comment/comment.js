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
        if(req.user && req.user.id) {
            comment.user = [req.user.id];
        }
            var c = new Comment(comment);

            c.save()
                .then(g=>Beats.findOneAndUpdate({_id: req.params.id},{$push:{comments:g._id}}).populate([{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]).exec())
                .then(i=>{
                    Beats.findOne({_id:i._id}).populate([{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]).exec().then(r=>res.json(r))
                    })
                .catch(err=>console.log(err));
    });
    
    api.post('/topic/:id/comment', function(req, res) {
        var comment = req.body;
        cachegoose._cache.clear();

        if(comment._id && comment.user[0]!==req.user._id){
            return res.sendStatus(401);
        }
        if(req.user && req.user.id) {
            comment.user = [req.user.id];
        }
        var c = new Comment(comment);

        c.save()
            .then(g=>Topic.findOneAndUpdate({_id: req.params.id},{$push:{comments:g}}).populate([{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]).exec())
          .then(i=>{
              Topic.findOne({_id:i._id}).populate([{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]).exec().then(r=>res.json(r))
          })
            .catch(err=>console.log(err));
    });
}



module.exports = commentRest;
