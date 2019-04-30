$(document).ready(function(){
    AdaptiveCards();
    $( window ).resize(function() {
        AdaptiveCards();
    });

    function AdaptiveCards() {
        var rowWidth = $("#posts").width();
        var countItems = Math.floor(rowWidth / 260);
        var itemWidth = Math.floor(rowWidth / countItems) - 15;

        $(".partCard").css('max-width', itemWidth);
    }

    $('#pagination .mark').parent().next().find('li').css('width', '65px');

    $('img[data-src]').each(function() {
        $(this).attr('src', $(this).attr('data-src'));
        $(this).removeAttr('data-src');
    });
});