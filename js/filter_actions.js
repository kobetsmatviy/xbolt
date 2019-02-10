$(function () {
    // Автоматично відкриваємо фільтр, якщо це /catalog/
    var thisURL = window.location.href;
    if (thisURL.substr(thisURL.indexOf('/catalog') + 1).length <= 8) {
        $('#filterArea, #overlay').addClass('visible');
    }

    $(window).resize(function() {
        AdaptiveFilter();
    });

    // Перемикач фільтру
    $('#filterName').on("click", function () {
        $('#filterArea').toggleClass('visible');
        // Перемкнути темну обкладинку, для більшого фокусу на фільтр / для ПК
        $('#overlay').toggleClass('visible');
    });
    $('#search').on("click", function () {
        // Сховати блок по кліку, якщо він у полі зору
        // інакше скрол догори
        var filterLastChildHeight = $('.filterType').last().height();
        var filterTop = $('.filterType').last().offset().top + filterLastChildHeight;
        var scrollTop = $(document).scrollTop();
        
        if (scrollTop + 45 > filterTop) {
            $('#filterArea').toggleClass('visible');
            $('#overlay').toggleClass('visible');
            $('html, body').animate({ scrollTop: 0 }, 500);
        }
        else {
            $('#filterArea').toggleClass('visible');
            $('#overlay').toggleClass('visible');
        }
    });
    // При натисканні поза фільтром приховуємо його
    // окрім натискання на фільтр та кнопку відправки
    $('#apply, #filter').on("click", function (e) {
        e.stopPropagation();
    });
    $('#overlay, #filterArea').on("click", function () {
        $('#filterArea').toggleClass('visible');
        $('#overlay').toggleClass('visible');
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
    $('select').change(MarkSelect);
    function MarkSelect() {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
        $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
        $('#apply').css('animation-name', 'submitMark').css('animation-duration', '3s');
    }

    // Приховуємо/показуємо блоки з деталями, якщо має active
    var $toggleDetails = $('#groups');
    $toggleDetails.on("click", 'input[type="button"]', function () {
        if ($(this).hasClass('active')) {
            $(this).next().hide();
            $toggleDetails.find('input[type="button"]').each(function () {
                $toggleDetails.find('input[type="button"]').removeClass('active');
            });
            if ($(this).hasClass('activeMark')) {
                $(this).removeClass('activeMark');
                $(this).addClass('mark');
            }
        }
        else {
            $toggleDetails.find('input[type="button"]').each(function () {
                $toggleDetails.find('input[type="button"]').removeClass('active');
            });
            $('.details').each(function () {
                $(this).hide();
            });
            $(this).addClass('active');
            $(this).next().show();

            $toggleDetails.find('input[type="button"]').each(function () {
                $toggleDetails.find('input[type="button"]').removeClass('activeMark');
            });

            if ($(this).hasClass('mark')) {
                $(this).addClass('activeMark');
            }
        }
    });

    // Якщо відмічений хоча б один checkbox у блоку details, то
    // змінити значення відповідної кнопки на mark
    $('#groups').on("click", '.details input[type=checkbox]', function () {
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
        
        $('.details input[type=checkbox]').each(function() {
            if ($('.details input[type=checkbox]').parents('.details').find('input[type=checkbox]:checked').length) {
                $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
            }
        });
    });
    
    // змінити видимість remove при кліку на стан запчастини
    $('.chooseCondition input').on('click', function() {
        if ($('.chooseCondition input:checked').length) {
            $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
        }
        else {
            $(this).parents('.filterType').find('.filterName .remove').css('opacity', '.3');
        }
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

// Розміщення блоку деталей під кнопкою (адаптивно для всіх екранів) 
function AdaptiveFilter() {
    if ($(window).width() > 750) {
        var rowWidth = $("#groups").width();
        var countItems = Math.floor(rowWidth / (200 + 5));
        var inputOrder = -1;
        var detailsOrder = 0;

        // Значення order для кожного input[type=button]
        $("#groups input[type='button']").each(function() {
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