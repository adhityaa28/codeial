{
    let createComment=function(){

        let newCommentForm=$('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
                    $.ajax({
                        type:'post',
                        url:'/comments/create',
                        data:newCommentForm.serialize(),
                        success: function(data){
                            let newComment=newCommentDom(data.data.comment,data.data.name);
                            $(`.post-comments-list>ul`).prepend(newComment);
                            deletecomment($(`.delete-comment-button`,newComment))
                            
        
                           
        
                        },error: function(error){
                            console.log(error.responseText);
                        }
                    })
            
    })

    }
    let newCommentDom=function(comment,name)
    {
        
        return $(`<li id="comment-${comment._id}">
        <p>
            
                <small>
                    <a class="delete-comment-button" href="comments/destory/${ comment._id}">X</a>
                </small>
            
                ${ comment.content }
            <br>
            <small>
            ${ name }
            </small>
        </p>
    </li>`)
    }


    let deletecomment=function(deletelink){
        
        $(deletelink).click(function(e){
            e.preventDefault();
           $.ajax({
            type:'get',
            url:$(deletelink).prop('href'),
            success: function(data){
                $(`#comment-${data.data.comment_id}`).remove()
            },error:function(err){
                console.log(err.responseText);

            }
           })
    
        })
    }
    let deletecommentclass =$('.delete-comment-button')

   for(eachclass of deletecommentclass)
   {
   deletecomment(eachclass);
   }
   console.log("createcomment working")
     createComment();
    
    }