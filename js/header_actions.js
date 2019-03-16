$(function () {
    $('#marketName').mouseenter(function() {
        $('#marketNav').css('display', 'flex');
    });
    $('#marketNav').mouseleave(function() {
        $(this).css('display', 'none'); 
    });
    $('#profileName').mouseenter(function() {
        $('#profileNav').css('display', 'flex');
    });
    $('#profileNav').mouseleave(function() {
        $(this).css('display', 'none'); 
    });
    $(document).click(function(event) {
        if ($(event.target).closest('#marketNav, #profileNav').length) return;
        $('#marketNav, #profileNav').css('display', 'none');
        event.stopPropagation();
    });
});