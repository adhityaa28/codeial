{
   let createPost=function()
   {
    let newpostform=$('#new-post-form');

    newpostform.submit(function(e){
        e.preventDefault()

        $.ajax({
            type:'post',
            url:'posts/create',
            data: newpostform.serialize(),
            success: function(data){
                
                let newPost= newpostDom(data.data.post,data.data.name);
                $(`#post-list-container>ul`).prepend(newPost);
                deletePost($('.delete-post-button', newPost))
                console.log(data);
            },error: function(error){
                console.log(error.responseText);
            }
        });
    })
   }

   //method to create a post dom

   let newpostDom= function(post,name){
    return $(`<li id="post-${post._id}"> 
                <p>
                    
                        <small>
                            <a class="delete-post-button" href="posts/destory/${ post._id}">X</a>
                        </small>
                        ${ post.content }
                    <br>
                    <small>
                     ${name}
                    </small>
                </p>
                <div class="post-comments">
                    
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="add comment to the post">
                            <input type="hidden" name="post" value="${ post._id}">
                            <input type="submit" value="add comment">
                        </form>
                    
                </div>
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id}">
                        
                    </ul>
                </div>
            </li>`)
   }

// to delete a post

   let deletePost = function(deletelink){
    $(deletelink).click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deletelink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            },error: function(err){
                console.log(err.responseText);
            }
        })

    })
   }

   createPost();
}