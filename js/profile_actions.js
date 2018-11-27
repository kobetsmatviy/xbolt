$(document).ready(function(){
    AdaptiveCards();
    $( window ).resize(function() {
        AdaptiveCards();
    });

    function AdaptiveCards() {
        var rowWidth = $("main #posts").width();
        var countItems = Math.floor(rowWidth / 150);
        var itemWidth = Math.floor(rowWidth / countItems) - 15;

        $(".partCard").css('max-width', itemWidth);
    }
});