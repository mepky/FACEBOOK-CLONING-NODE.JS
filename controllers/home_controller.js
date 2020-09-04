const Post = require('../models/post');

module.exports.home = function(req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    Post.findById({}, function(err, posts) {
        if (err) {
            console.log('Error in finding post');
            return;
        }

        return res.render('home', {
            title: "Home",
            posts: posts
        });

    })



}

// module.exports.actionName = function(req, res){}