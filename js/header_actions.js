$(function () {
    var market = false;
    $('#marketName').mousedown(function() {
        if (market == false) {
            $('#marketNav').css('display', 'flex');
            market = true;
        }
        else if (market == true) {
            $('#marketNav').css('display', 'none');
            market = false;
        }
    });
    $(document).click(function(event) {
        if ($(event.target).closest('#marketName, #marketNav').length) return;
        $('#marketNav').css('display', 'none');

        market = false;
        event.stopPropagation();
    });
});