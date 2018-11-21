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

        //#### Звертаємо увагу на рейтинг стану #############################################################
        if ($('.jq-ry-rated-group').width() == 0) {
            $('.rateYo').css('box-shadow', '0 0 0 2px rgba(255, 0, 0, 0.3)');
        }
        else {
            $('.rateYo').css('box-shadow', 'none');
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

        //#### Якщо якесь поле містить клас помилки, то забороняємо відправку форми ******************
        $('.interaction *').each(function() {
            if ($(this).hasClass('error')) {
                e.preventDefault();
            }
        });
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

        $(this).on('click tap', function() {
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
                $(this).closest('label').find('b').text()+'</span>');
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

    $(".rateYo").rateYo({
        starWidth: "25px",
        rating: 0,
        numStars: 5,
        halfStar: true,
        // readOnly: true,
        normalFill: "#A0A0A0",
        ratedFill: "#FF3300",
        "starSvg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5120 5120" preserveAspectRatio="xMidYMid meet"><path d="M2485 5108 c-11 -6 -22 -14 -25 -18 -3 -4 -27 -19 -55 -34 -27 -15 -78 -44 -112 -64 -66 -39 -198 -115 -248 -142 -16 -10 -84 -47 -150 -85 -66 -37 -183 -102 -260 -144 -77 -42 -154 -86 -170 -98 -47 -32 -84 -53 -91 -52 -4 0 -10 -4 -13 -9 -3 -5 -28 -21 -56 -36 -27 -15 -79 -44 -115 -65 -178 -102 -279 -159 -440 -248 -187 -104 -205 -114 -290 -166 -41 -26 -96 -58 -122 -72 -29 -15 -50 -34 -53 -48 -3 -12 -4 -591 -3 -1287 l3 -1264 55 -33 c30 -18 69 -39 85 -47 33 -16 144 -81 160 -93 25 -21 121 -77 235 -138 69 -38 168 -93 220 -123 52 -31 149 -85 215 -121 66 -36 122 -68 125 -72 3 -3 28 -18 55 -33 63 -34 111 -63 150 -89 17 -12 89 -53 160 -93 160 -88 343 -190 495 -277 63 -36 138 -78 165 -93 28 -15 61 -35 74 -45 30 -24 69 -24 101 -2 13 10 48 32 77 48 85 48 446 251 666 373 67 38 151 88 187 110 36 23 90 56 120 72 30 17 114 64 185 105 72 41 177 100 235 131 58 32 107 60 110 64 3 3 66 38 140 78 74 40 147 83 163 96 15 13 42 30 60 37 17 7 34 16 37 20 3 3 28 18 55 33 28 15 75 42 105 59 l55 33 0 1284 0 1284 -40 23 c-22 12 -47 27 -55 33 -33 23 -152 92 -265 154 -66 36 -131 73 -145 81 -83 49 -371 210 -413 232 -28 14 -56 30 -62 37 -7 6 -31 20 -54 30 -22 11 -41 23 -41 28 0 5 -4 6 -10 3 -5 -3 -10 -2 -10 4 0 5 -9 12 -19 16 -11 3 -37 18 -58 32 -21 15 -96 59 -168 98 -71 40 -184 103 -250 140 -66 38 -172 97 -235 133 -63 35 -144 81 -180 102 -36 21 -83 49 -105 61 -22 12 -54 32 -71 45 -33 26 -77 30 -109 12z m294 -1294 c529 -95 933 -498 1036 -1035 21 -111 21 -327 0 -438 -103 -537 -499 -933 -1036 -1036 -51 -9 -136 -16 -219 -16 -621 0 -1136 432 -1255 1052 -21 111 -21 327 0 438 134 699 787 1158 1474 1035z"/>'
    });
});