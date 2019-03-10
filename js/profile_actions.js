$(document).ready(function(){
    AdaptiveCards();
    $( window ).resize(function() {
        AdaptiveCards();
    });

    function AdaptiveCards() {
        var rowWidth = $(".cards").width();
        var countItems = Math.floor(rowWidth / 245);
        var itemWidth = Math.floor(rowWidth / countItems) - 15;

        $(".partCard").css('max-width', itemWidth);
    }

    $('.glyphicon-remove').on('click', function() {
        $(this).parent().append(
            '<div class="deletePost">'+
                '<span class="caption">Вам вдалося продати запчастину?!</span>'+
                '<div class="vote">'+
                    '<span class="yes">Так<span class="glyphicon glyphicon-thumbs-up"></span></span>'+
                    '<span class="no">Ні<span class="glyphicon glyphicon-thumbs-down"></span></span>'+
                '</div>'+
            '</div>'+
            '<div id="overlayModal"></div>');
    });

    $('.partCard').delegate('#overlayModal', 'click', function() {
        $(this).remove();
        $('.deletePost').remove();        
    });

    $('.partCard').delegate('.yes, .no', 'click', function() {
        $(this).css({
            'width': '100%',
            'transition': 'all 1s'
        });
        $(this).next().css({
            'width': '0',
            'opacity': '0',
            'transition': 'all 1s'
        });
        $(this).prev().css({
            'width': '0',
            'opacity': '0',
            'transition': 'all 1s'
        });
        
        setTimeout(function() {
            $('.partCard #overlayModal').remove();  
            $('.deletePost').remove();
        }, 1000);
    });
});