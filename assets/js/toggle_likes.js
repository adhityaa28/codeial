// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX


export class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            //console.log($(self).attr('href'))
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
                data: $(self).serialize(),
                success: function(data) {
                
                    let likesCount = parseInt($(self).attr('data-likes'));
                    console.log(likesCount);
                    if (data.data.deleted == true){
                        if(likesCount!=0){
                            likesCount -= 1;
                        }
                        
                        
                    }else{
                        likesCount += 1;
                    }
    
    
                    $(self).attr('data-likes', likesCount);
                    $(self).html(`${likesCount} Likes`);
    
                },error:function(errData) {
                    console.log(errData);
                    console.log('error in completing the request');
                }
            })
            
            
            

        });
    }
   
}
$('.toggle-like-button').each(function(){
    //console.log(this)
    let self = this;
    let toggleLike = new ToggleLike(self);
});