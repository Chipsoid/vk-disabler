/******************************************************************************/
//
// Delete all re-posts on vk.com/feed
// Pure and beatiful feed without bullshit
// Author: Andrey "Chips" Kuzmin <kaachips@gmail.com>
//
/******************************************************************************/

var open_button = '<span class="open_repost" alt="What it was?" title="What it was?">&darr;</span>';

$(function(){
    // on load
    clear_repost();

    // while scroll with dalay
    $(window).scroll(function() {
        setInterval( function(){ clear_repost() }, 1000 );
    });

    // buttons
    $('span.open_repost').live('click', function() {
        // var post_div = $(this).parent().parent();
        var repost_div = $(this).parent().next();
        if ( repost_div.hasClass('repost_closed') ) {
            repost_div.slideDown('fast');
            repost_div.removeClass('repost_closed');
            $(this).html("&uarr;");
        }
        else if ( repost_div.not(':hidden') ) {
            repost_div.slideUp('fast');
            repost_div.addClass('repost_closed');
            $(this).html("&darr;");
        }
        else {
            repost_div.slideUp('fast');
            repost_div.addClass('repost_closed');
            $(this).html("&darr;");
        }
    });
});

function clear_repost() {

    $("div.feed_row:has(a.published_by)").each( function() {
        if ( ! $(this).hasClass("closed") ) {
            var author    = $(this).find('a.author').text();
            var publisher = $(this).find('a.published_by').text();
            var text = '<div class="repost_deleted">';
                text += open_button;
                text += author + ' made repost published by ' + publisher;
                text += '</div>';
            $(this).addClass('closed');
            $(this).children().slideUp('fast').addClass('repost_closed'); 
            $(this).prepend(text);
        }
    });
}
