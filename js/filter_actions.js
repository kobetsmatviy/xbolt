$(function () {
    // Перемикач фільтру
    $('#filterName').on("click", function () {
        $('#filter').toggle();
    });
    $('#search').on("click", function () {
        // Сховати блок по кліку, якщо він у полі зору
        // інакше скрол догори
        var submitTop = $('input[type=submit]').offset().top;
        var scrollTop = $(document).scrollTop();
        
        if (scrollTop + 45 > submitTop) {
            $('#filter').show();
            $('html, body').animate({ scrollTop: 0 }, 500);
        }
        else {
            $('#filter').hide();
            $('html, body').animate({ scrollTop: 0 }, 500);
        }
    });

    // Показати/сховати блоки фільтру залежно від розміру екрану
    if ($(window).width() < 768) {
        $('.partsName').on("click", function () {
            $(this).next().toggle();
        });
        // відмінити дію при кліку по скиданні
        $('.partsName .remove').on("click", function (e) {
            e.stopPropagation();
        });
    }
    else {
        $('.partsCategories').each(function () {
            $('.partsCategories').show();
        });
    }

    // Скинути значення в кожному блоку
    var $resetCategories = $('.remove');
    $resetCategories.on("click", function () {
        $(this).parents('aside div').next().each(function () {
            $(this).find('select').removeClass('mark');
            $(this).find('select').prop('selectedIndex', 0);
            $(this).find('select:not(:first)').addClass('disabled').prop('disabled', true);

            $(this).find('input').removeClass('active mark activeMark');
            $(this).find('input').prop('checked', false);

            $(this).find('.details').each(function () {
                $(this).hide();
            });
        });
    });

    // Якщо select значення змінено, позначаємо mark
    $('select').change(function () {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
    });

    // Приховуємо/показуємо блоки з деталями, якщо має active
    var $toggleDetails = $('input[type="button"]');
    $toggleDetails.on("click", function () {
        if ($(this).hasClass('active')) {
            $(this).next().hide();
            $toggleDetails.each(function () {
                $toggleDetails.removeClass('active');
            });
            if ($(this).hasClass('activeMark')) {
                $(this).removeClass('activeMark');
                $(this).addClass('mark');
            }
        }
        else {
            $toggleDetails.each(function () {
                $toggleDetails.removeClass('active');
            });
            $('.details').each(function () {
                $(this).hide();
            });
            $(this).addClass('active');
            $(this).next().show();

            $toggleDetails.each(function () {
                $toggleDetails.removeClass('activeMark');
            });

            if ($(this).hasClass('mark')) {
                $(this).addClass('activeMark');
            }
        }
    });

    // Якщо відмічений хоча б один checkbox у блоку details, то
    // змінити значення відповідної кнопки на mark
    var $markDetails = $('.details input[type=checkbox]');
    $markDetails.on("click", function () {
        if ($(this).parents('.details').find('input[type=checkbox]:checked').length) {
            //$(this).parents('.details').prev().removeClass('active');
            $(this).parents('.details').prev().addClass('mark');
            $(this).parents('.details').prev().addClass('activeMark');
        }
        else {
            $(this).parents('.details').prev().removeClass('mark');
            $(this).parents('.details').prev().removeClass('activeMark');
            $(this).parents('.details').prev().addClass('active');
        }
    });
});