"use strict";


function updateLike()
{
    $.ajax({
        type: 'POST',
        url: '/images/like',
        data: { ID: $(".iimage").children('img').attr('alt'),
                LIKES: $("#ilike").text()},
        success: function(result) {
            $("#ilike").empty();
            $("#ilike").text(result.toString());
            $("#like").find('img:first').attr('src','/liked.png');
        }
    });
}

$(document).ready(function(){
    $('#post').on('click', function(e){
        e.preventDefault();
           $.ajax({
                type: 'POST',
                url: '/images/comment',
                data: { ID: $(".iimage").children('img').attr('alt'),
                        num_cm: $(".icomment").text(),
                        COMMENT: $("#comment").val()},
                success: function(result) 
                {
                    console.log(result);
                    // push the comment to the list
                    if (result != "") 
                    {

                        var html = $('<li>').text(result[0]['msg']).append('<br>');
                        var desc = $('<span>').attr('class', 'cmdesc').append(result[0]['user'] + " " + result[0]['date']);
                        desc.appendTo(html);
                        html.prependTo('#comments');
                        //clear the input text field
                        $('#comment').val('');
                        //update number of comments
                        var ocm = $('#icomment').text();
                        var ncm = parseInt(ocm) + 1;
                        $("#icomment").text(ncm.toString());
                    }
                }
            });

    })
})
