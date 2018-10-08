$(function () {
    var $proportionPhoto = $('.partsRow .photo img');

    $proportionPhoto.each(function () {
        if ($(this).height() > $(this).width()) {
            $(this).css('width', '80%');
        }
    });
});