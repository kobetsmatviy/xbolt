$(function () {
    $('.phone a, .contacts a').on('mouseover', function(e) {
        $('.phoneNumber').each(function() {
            $(this).text($(this).closest('a').data('last'));
            $(this).closest('a').prop('href', 'tel:'+$(this).closest('a').data('last'));
            $(this).removeAttr('class');
        });
    });
});