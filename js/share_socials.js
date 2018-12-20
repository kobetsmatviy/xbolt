$(function () {
    $('.share').on('click', function() {
        $('.shareWindow').toggleClass('visible');
    });
    $(document).click(function(event) {
        if ($(event.target).closest('.share').length) return;
        $('.shareWindow').removeClass('visible');
        event.stopPropagation();
    });
});