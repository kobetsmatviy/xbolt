﻿$(function () {
    // Перемикач фільтру
    $('#filterName').on("click", function () {
        $('#filter').toggle();
        // Перемкнути темну обкладинку, для більшого фокусу на фільтр / для ПК
        $('#overlay').toggle();
    });
    $('#search').on("click", function () {
        // Сховати блок по кліку, якщо він у полі зору
        // інакше скрол догори
        var filterLastChildHeight = $('.filterType:last-child').height();
        var filterTop = $('.filterType:last-child').offset().top + filterLastChildHeight;
        var scrollTop = $(document).scrollTop();
        
        if (scrollTop + 45 > filterTop) {
            $('#filter').show();
            $('html, body').animate({ scrollTop: 0 }, 500);
            $('#overlay').show();
        
        }
        else {
            $('#filter').hide();
            $('#overlay').hide();
            // $('html, body').animate({ scrollTop: 0 }, 500);
        }
    });
    // На телефонах при натисканні поза фільтром ховаємо його
    if ($(window).width() <= 750) {
        $('form').on("click", function (e) {
            e.stopPropagation();
        });

        $('#overlay').on("click", function () {            
            $('#filter').hide();
            $('#overlay').hide();
        });
        $('#filter').on("click", function () {
            $('#filter').hide();
            $('#overlay').hide();
        });
    }
    // На більших екранах коли клацаєш поза межами фільтру
    // else {
    //     $('#overlay').on("click", function () {
    //         $('#filterName').css('background-color', '#0088cc')
    //     });
    // }

    // Показати/сховати блоки фільтру залежно від розміру екрану
    if ($(window).width() <= 750) {
        $('.filterName').on("click", function () {
            $(this).next().toggle();
        });
        // окрім кнопки скидання
        $('.filterName .remove').on("click", function (e) {
            e.stopPropagation();
        });
    }
    else {
        $('.filterCategory').each(function () {
            $('.filterCategory').show();
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
        $(this).css('opacity', '.2');
    });

    // Якщо select значення змінено, позначаємо mark
    $('select').change(function () {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
        $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
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
            $(this).parents('.details').prev().addClass('mark');
            $(this).parents('.details').prev().addClass('activeMark');
            $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
        }
        else {
            $(this).parents('.details').prev().removeClass('mark');
            $(this).parents('.details').prev().removeClass('activeMark');
            $(this).parents('.details').prev().addClass('active');
            $(this).parents('.filterType').find('.filterName .remove').css('opacity', '.2');
        }
        
        $markDetails.each(function() {
            if ($markDetails.parents('.details').find('input[type=checkbox]:checked').length) {
                $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
            }
        });
    });
});