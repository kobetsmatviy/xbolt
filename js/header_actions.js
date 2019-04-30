$(function () {
    $('#marketName').mousedown(function() {
        $('#marketNav').css('display', 'flex');
    });
    // $('#marketNav').mousedown(function() {
    //     $(this).css('display', 'none'); 
    // });
    $('#profileName').mousedown(function() {
        $('#profileNav').css('display', 'flex');
    });
    // $('#profileNav').mousedown(function() {
    //     $(this).css('display', 'none'); 
    // });
    $(document).click(function(event) {
        if ($(event.target).closest('#marketName, #profileName, #marketNav, #profileNav').length) return;
        $('#marketNav, #profileNav').css('display', 'none');
        event.stopPropagation();
    });
});