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

    var profile = false;
    $('#profileName').mousedown(function() {
        if (profile == false) {
            $('#profileNav').css('display', 'flex');
            profile = true;
        }
        else if (profile == true) {
            $('#profileNav').css('display', 'none');
            profile = false;
        }
    });
    $(document).click(function(event) {
        if ($(event.target).closest('#marketName, #profileName, #marketNav, #profileNav').length) return;
        $('#marketNav, #profileNav').css('display', 'none');

        market = false;
        profile = false;
        event.stopPropagation();
    });
});