$(function () {
    AdaptiveFilter();
    $(window).resize(function() {
        AdaptiveFilter();
    });
    
    // Розміщення блоку деталей під кнопкою (адаптивно для всіх екранів) 
    function AdaptiveFilter() {
        if ($(window).width() > 750) {
            var rowWidth = $(".filterCategory").width();
            var countItems = Math.floor(rowWidth / (200 + 5));
            var inputOrder = -1;
            var detailsOrder = 0;

            // Значення order для кожного input[type=button]
            $(".filterCategory input[type=button]").each(function() {
                if (($(this).index()/2) % countItems == 0) {
                    inputOrder += 2;
                }
                else {
                    inputOrder++;
                }
                $(this).css("order", inputOrder);
            });
            // Значення order для кожного блоку details
            $(".details").each(function() {
                if((($(this).index()-1)/2) % countItems == 0) {
                    detailsOrder += countItems + 1;
                }
                $(this).css("order", detailsOrder);
            });
            // Ширина блоку details, залежно від кількості елементів у рядку
            $(".details").width(countItems * 200);
        }
        // Обнуляємо данні для смартфонів, вони по стандарту ті що треба
        else {
            $(".filterCategory").children().each(function() {
                $(this).css("order", 0);
            });
            $(".details").width("100%");
        }
    }

    // Перемикач фільтру
    $('#filterName').on("click", function () {
        $('#filter').toggle();
        // Перемкнути темну обкладинку, для більшого фокусу на фільтр / для ПК
        $('#overlay').toggle();
    });
    $('#search').on("click", function () {
        // Сховати блок по кліку, якщо він у полі зору
        // інакше скрол догори
        var filterLastChildHeight = $('.filterType').last().height();
        var filterTop = $('.filterType').last().offset().top + filterLastChildHeight;
        var scrollTop = $(document).scrollTop();
        
        if (scrollTop + 45 > filterTop) {
            $('#filter').show();
            $('#overlay').show();
            $('html, body').animate({ scrollTop: 0 }, 500);
        
        }
        else {
            $('#filter').hide();
            $('#overlay').hide();
        }
    });
    // При натисканні поза фільтром приховуємо його
    // окрім натискання на фільтр та кнопку відправки
    $('#apply, #filter form').on("click", function (e) {
        e.stopPropagation();
    });
    $('#overlay, #filter').on("click", function () {
        $('#filter').hide();
        $('#overlay').hide();
    });

    // Перемикач блоків фільтру на смартфонах
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

    // Скинути значення в кожному блоці при кліку на хрестик
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
            $(this).find('.details').css('border-color', '#2299d4');
        });
        $(this).css('opacity', '.2');
    });

    // Якщо select значення змінено, позначаємо mark
    $('select').change(function () {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
        $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
        $('#apply').css('animation-name', 'submitMark').css('animation-duration', '3s');
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
    var $checkDetails = $('.details input[type=checkbox]');
    $checkDetails.on("click", function () {
        if ($(this).parents('.details').find('input[type=checkbox]:checked').length) {
            $(this).parents('.details').prev().addClass('mark');
            $(this).parents('.details').prev().addClass('activeMark');
            $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
            $('#apply').css('animation-name', 'submitMark').css('animation-duration', '3s');
            $(this).parents('.details').css('border-color', '#499b42');
        }
        else {
            $(this).parents('.details').prev().removeClass('mark');
            $(this).parents('.details').prev().removeClass('activeMark');
            $(this).parents('.details').prev().addClass('active');
            $(this).parents('.filterType').find('.filterName .remove').css('opacity', '.2');
            $(this).parents('.details').css('border-color', '#2299d4');
        }
        
        $checkDetails.each(function() {
            if ($checkDetails.parents('.details').find('input[type=checkbox]:checked').length) {
                $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
            }
        });
    });

    var $radioDetails = $('.details input[type=radio]');
    $radioDetails.on("click", function () {
        if ($(this).parents('.details').find('input[type=radio]:checked').length) {
            $('.details').prev().removeClass('mark');
            $(this).parents('.details').prev().addClass('mark');
            $(this).parents('.details').prev().addClass('activeMark');
        }
    });

    // Якщо курсор наведений на кнопку пошуку, то
    // пришвидшуємо анімацію для показу дії
    $('#apply').mouseover(function() {
        $(this).css('animation-duration', '1s');
    });
    $('#apply').mouseout(function() {
        $(this).css('animation-duration', '3s');
    });
});