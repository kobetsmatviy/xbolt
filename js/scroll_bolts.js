$(function () {
    $(window).on('scroll', function() {
        var deg = -($(window).scrollTop() / 5);
        $('#preview .bolt').css({ transform: 'rotate(' + deg + 'deg)' });
    }); 
});