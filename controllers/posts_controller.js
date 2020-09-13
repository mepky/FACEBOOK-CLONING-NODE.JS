const Post = require('../models/post')
const Comment = require('../models/comments');
module.exports.create = async function(req, res) {
    try {

        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post Created"
            })
        }
        req.flash('success', 'Post created successfully');
        return res.redirect('back');

    } catch (error) {
        // console.log('Error', error);
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id int
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.post_id
                    },
                    message: "post Deleted"
                })
            }
            req.flash('success', 'post and associated commets are deleted');
            return res.redirect('back');


        } else {
            req.flash('error', 'you can not delete this post');

            return res.redirect('back');
        }
    } catch (error) {
        // console.log('Error', error);
        req.flash('error', 'you can not delete this post');

        return res.redirect('back');

    }
}