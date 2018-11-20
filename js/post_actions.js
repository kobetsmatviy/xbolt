$(function () {
    // Адаптивний вибір категорії
    AdaptiveCategory();
    function AdaptiveCategory() {
        // if ($(window).width() > 750) {
            var rowWidth = $(".category").width();
            var countItems = Math.floor(rowWidth / (200 + 5));
            var inputOrder = -1;
            var detailsOrder = 0;

            // Значення order для кожного input[type=button]
            $(".category input[type=button]").each(function() {
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
        // }
        // // Обнуляємо данні для смартфонів, вони по стандарту ті що треба
        // else {
        //     $(".category").children().each(function() {
        //         $(this).css("order", 0);
        //     });
        //     $(".details").width("100%");
        // }
    }

    //#### Показуємо завантажені файли
    function showFile(e) {
        var files = e.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) continue;
            var fr = new FileReader();
            fr.onload = (function(theFile) {
                return function(e) {
                    var li = document.createElement('li');
                    li.innerHTML = "<img src='" + e.target.result + "' />";
                    document.getElementById('list').insertBefore(li, null);
                    document.getElementById('list').style.backgroundImage = 'none';
                };
            })(f);
        
            fr.readAsDataURL(f);
        }
    }
    document.getElementById('uploadImg').addEventListener('change', showFile, false);

    // При додаванні фото, видаляємо клас помилки
    $('#uploadImg').change(function() {
        $('#list').css('box-shadow', 'none');
        $(this).removeClass('error').addClass('valid').attr('aria-invalid', 'false');
        $(this).closest('.interaction').next().find('label.error').remove();
    });
    
    $('form').submit(function(e) {
        //#### Якщо якесь поле містить клас помилки, то забороняємо відправку форми ******************
        $('.interaction *').each(function() {
            if ($(this).hasClass('error')) {
                e.preventDefault();
            }
        });

        //#### Валідація загрузки фото
        var itemImg = $(this).find('#list li');

        if ($(itemImg).length > 5) {
            $(itemImg).each(function() {
                if ($(this).index() >= 5) {
                    $(this).remove();
                }
            });
        }
        else if($(itemImg).length <= 0) {
            $('#list').css('box-shadow', '0 0 0 2px rgba(255, 0, 0, 0.3)');
        }

        //#### Звертаємо увагу на рейтинг стану
        if ($('input[type="range"]').val() <= 0) {
            $('.stateSvg').css('box-shadow', '0 0 0 2px rgba(255, 0, 0, 0.3)');
        }
        
        // Валідація авто блоку
        if (($('.selectedAutos .auto').length == 0) || ($('.selectedAutos .auto').length >= 5)) {
            $('.automobiles select').not('.disabled').addClass('error');
            $('.automobiles select').closest('.interaction').next().find('.advice').remove();
            $('<label class="error">Виберіть вид транспорту, марку та модель</label>').appendTo($('.automobiles select').closest('.interaction').next());
        }

        // Валідація блоку категорії
        if (($('.selectedCategory span').length < 2)) {
            $('#toggleCategory').addClass('error');
            $('.selectedCategory').closest('.interaction').next().find('.advice').remove();
            $('.selectedCategory').closest('.interaction').next().find('.error').remove();
            $('<label class="error">Потрібно обрати категорію запчастини</label>').appendTo($('.selectedCategory').closest('.interaction').next());
        }
    });

    //#### При зміні регіону
    $('select').change(function() {
        $(this).css('box-shadow', 'none');
    });

    //#### Якщо модель автомобіля :selected, то зберігаємо його
    $('select[name="model"]').change(function() {        
        $('.selectedAutos .auto').each(function(e) {
            for (var i = 0; i < 3; i++) {
                if ($(this).find('span').eq(i).attr('id') != $('.automobiles select').eq(i).find('option:selected').val()) {
                    // alert($(this).find('span').eq(i).attr('id') +' != '+ $('.automobiles select').eq(i).find('option:selected').val());
                    break;
                }
                else {
                    // alert($(this).find('span').eq(i).attr('id') +' == '+ $('.automobiles select').eq(i).find('option:selected').val());
                    
                    if (i == 2) {
                        alert('Вже існує');
                        $('select[name="model"]').removeClass('mark');
                        e.preventDefault();
                        e.stopPropagation();
                        break;
                    }
                }
            }
        });

        // Додаємо авто і заповняємо його атрибути для відправки
        $('.selectedAutos').append('<span class="auto"></span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="transport"] option:selected').val()+'></span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="brand"] option:selected').val()+'>' +$('select[name="brand"] option:selected').text()+ '</span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="model"] option:selected').val()+'>' +$('select[name="model"] option:selected').text()+ '</span>');
        $('.selectedAutos .auto:last').append('<span class="remove"></span>');

        $(this).removeClass('mark');
        $('.automobiles select').removeClass('error').hide();
        CheckAutoExist();
    });
    $('#addAuto').on('click', function(e) {
        $('.automobiles select').show();
        $('#addAuto').css('display', 'none');
        e.preventDefault();
    });

    //#### Видаляємо обраний автобоміль при кліку на його блок
    $('.selectedAutos').delegate('.auto', 'click', function() {
        $(this).remove();
        CheckAutoExist();
    });
    $('.automobiles select').on('change', function() {
        $('.automobiles select').closest('.interaction').next().find('.error').remove();
    });

    //#### Повзунок input[type=range] для стану
    var state = 0;
    $('input[type="range"]').on('mouseenter mousemove', function(e) {
        $(this).val((e.pageX - $(this).offset().left) / ($(this).outerWidth() / 10));

        $(this).on('click', function() {
            state = $(this).val();
            $('.stateSvg').css('box-shadow', 'none');
            $('input[type="range"]').removeClass('error').addClass('valid').attr('aria-invalid', 'false');
            $(this).closest('.interaction').next().find('label.error').hide();
        });

        ChangeState();
    });

    // Якщо select значення змінено, позначаємо mark
    $('select').change(function () {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
        $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
        $('#apply').css('animation-name', 'submitMark').css('animation-duration', '3s');
    });

    // Відміняємо поведінку button#toggleCategory
    $('#toggleCategory').on('click', function(e) {
        e.preventDefault();
    });

    // Приховуємо/показуємо блоки з деталями, якщо має active
    var $toggleDetails = $('.category input[type="button"]');
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

    // Якщо відмічений хоча б один radio у блоку details, то
    // змінити значення відповідної кнопки на mark
    var $radioDetails = $('.details input[type=radio]');
    $radioDetails.on("click", function () {
        if ($(this).parents('.details').find('input[type=radio]:checked').length) {
            $('.details').prev().removeClass('mark');
            $(this).parents('.details').prev().addClass('mark');
            $(this).parents('.details').prev().addClass('activeMark');
            $('.selectedCategory').html('<span>'+$(this).parents('.details').prev().val()+'</span><span>'+
                $(this).closest('label').find('b').text()+'</span>').css({
                    'margin-top': '10px',
                    'margin-left': '5px'
                });
            $('#toggleCategory').text('Змінити').css({
                'padding': '0',
                'padding-left': '5px',
                'height': '20px',
                'font-size': '12px'
            });
            $('#toggleCategory').removeClass('error');
            $('.selectedCategory').closest('.interaction').next().find('.error').remove();
        }
    });

    // Приховуємо блок з категорією при кліку поза його межами
    $(document).click(function(event) {
        if ($(event.target).closest('.category').length) return;
        else if ($(event.target).closest('#toggleCategory').length) return;
        $('.category').css('visibility', 'hidden');
        $('.category').css('position', 'absolute');
        $('#toggleCategory').removeClass('active');
        event.stopPropagation();
    });

    //#### Змінюємо значення стану на установлене, при виведу курсору з елементу 
    $('input[type="range"]').on('mouseout', function() {
        $(this).val(state);
        ChangeState();
    });

    // Перемикаємо блок з категорією
    $('#toggleCategory').on('click', function() {
        if ($('.category').css('visibility') == 'hidden') {
            $('.category').css('visibility', 'visible');
        }
        else {
            $('.category').css('visibility', 'hidden');
        }
        
        if ($(window).width() <= 750) {
            if ($('.category').css('visibility') == 'hidden') {
                $('.category').css('position', 'absolute');
            }
            else {
                $('.category').css('position', 'static');
            }
        }
    });

    // Перевірка існування блоку .auto
    function CheckAutoExist() {
        if ($('.selectedAutos .auto').length < 5) {
            $('#addAuto').css('display', 'flex');
        }
        else {
            return false;
        }
    }

    // Обрати стан
    function ChangeState() {
        switch($('input[type="range"]').val()) {
            case '1': {
                $('.stateSvg').html('<img src="images/half.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '2': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '3': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/half.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '4': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '5': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/half.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '6': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '7': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/half.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '8': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
            case '9': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/half.svg" />');
                break;
            }
            case '10': {
                $('.stateSvg').html('<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />'+
                '<img src="images/full.svg" />');
                break;
            }
            default: {
                $('.stateSvg').html('<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />'+
                '<img src="images/empty.svg" />');
                break;
            }
        }
    }
});