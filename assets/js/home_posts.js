{
    //method 2 ssubmit the data for create form
    let createPost = function() {
            let newPostForm = $('new-post-form');
            newPostForm.submit(function(e) {
                e.preventDefault();

                $.ajax({
                    type: 'post',
                    url: '/posts/create',
                    data: newPostForm.serialize(),
                    success: function(data) {
                        let newPost = newPostDom(data.data.post);
                        $('#posts-list-container>ul').prepend(newPost);
                        deletePost($(' .delete-post-button'), newPost);

                    },
                    error: function(error) {
                        console.log(error.responseText);
                    }
                })

            })
        }
        //method to create a post in DOM
    let newPostDom = function(post) {
        return $(`<li id="post-${ post._id}">
        <p>
                <small>
                <a  class="delete-post-button"
                href="/posts/destroy/${ post._id}">delete</a>
            </small>
                
            ${post.content}
    
                        <br>
                        <small>
                        ${post.user.name}
        </small>
        </p>
    
        <div id="comment-feed">
        
                <form action="/comments/create" id="list-comments" method="POST">
                    <input type="text" name="content" placeholder="Comment here..">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="add Comment">
                </form>
        
    
                    <div id="post-comment-list">
                        <ul id="post-comments-${post._id}">
                            
                    </div>
        </div>
    
    
    </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}