$(function () {
    //#### Адаптивний вибір категорії
    AdaptiveCategory();
    function AdaptiveCategory() {
        if ($(window).width() > 750) {
            var rowWidth = $("#category").width();
            var countItems = Math.floor(rowWidth / (200 + 5));
            var inputOrder = -1;
            var detailsOrder = 0;

            // Значення order для кожного input[type=button]
            $("#category input[type=button]").each(function() {
                if (($(this).index()/2) % countItems == 0) {
                    inputOrder += 2;
                }
                else {
                    inputOrder++;
                }
                $(this).css("order", inputOrder);
                $(this).width((rowWidth / countItems) - 15);
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
            $("#category").children().each(function() {
                $(this).css("order", 0);
                $(this).css("width", "100%");
            });
            $(".details").css("width", "100%");
        }
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

    //#### КАТЕГОРІЯ перемикач
    $('#toggleCategory').on('click', function(e) {
        // Перемикач станів
        if ($('#category').css('display') == 'none') {
            $('#category').css('display', 'flex');
        }
        else {
            $('#category').css('display', 'none');
        }
        // Відміняємо поведінку button#toggleCategory
        e.preventDefault();
    });
    // Приховуємо/показуємо блоки з деталями, якщо має active
    var $categoryButton = $('#category input[type="button"]');
    $categoryButton.on("click", function () {
        if ($(this).hasClass('active')) {
            $(this).next().hide();
            $categoryButton.each(function () {
                $categoryButton.removeClass('active');
            });
            if ($(this).hasClass('activeMark')) {
                $(this).removeClass('activeMark');
                $(this).addClass('mark');
            }
        }
        else {
            $categoryButton.each(function () {
                $categoryButton.removeClass('active');
            });
            $('.details').each(function () {
                $(this).hide();
            });
            $(this).addClass('active');
            $(this).next().show();

            $categoryButton.each(function () {
                $categoryButton.removeClass('activeMark');
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
            $('#toggleCategory').css('display', 'block');
            $('#category').css('display', 'none').removeClass('error');
        }
    });

    //#### АВТОМОБІЛЬ :selected, зберігаємо його
    $('select[name="model"]').change(function() {        
        $('.selectedAutos .auto').each(function(e) {
            for (var i = 0; i < 3; i++) {
                if ($(this).find('span').eq(i).attr('id') != $('.automobiles select').eq(i).find('option:selected').val()) {
                    break;
                }
                else {                    
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
    // Видаляємо авто при кліку на його блок
    $('.selectedAutos').delegate('.auto', 'click', function() {
        $(this).remove();
        CheckAutoExist();
    });
    $('.automobiles select').on('change', function() {
        $('.automobiles select').closest('.interaction').next().find('.error').remove();
    });
    // Перевірка існування блоку .auto
    function CheckAutoExist() {
        if ($('.selectedAutos .auto').length < 3) {
            $('#addAuto').css('display', 'flex');
        }
        else {
            return false;
        }
    }

    //#### СТАН деталі
    var usedItem = $('.chooseCondition input[value="usedItem"]').on('change', function() {
        $('.chooseCondition').removeClass('error');

        if ($('.rateYo').rateYo("rating") > 0) {
            $('.chooseCondition').closest('.interaction').next().find('.error').remove();
        }
    });
    var newItem = $('.chooseCondition input[value="newItem"]').on('change', function() {
        $('.rateYo').rateYo("rating", 10);
        $('.chooseCondition').removeClass('error');

        if ($('.rateYo').rateYo("rating") > 0) {
            $('.chooseCondition').closest('.interaction').next().find('.error').remove();
        }
    });
    $(".rateYo").rateYo("option", "onSet", function () {
        if (newItem.prop('checked') && $('.rateYo').rateYo("rating") < 10 && $('.rateYo').rateYo("rating") > 0) {
            usedItem.prop('checked', true);
        }
        if ($('.rateYo').rateYo("rating") > 0) {
            $('.rateYo').removeClass('error');
        }
    });

    //#### РЕГІОН при зміні
    $('select').change(function() {
        $(this).css('box-shadow', 'none');
    });
    
    //++++ Якщо select значення змінено, позначаємо mark
    $('select').change(function () {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
        $(this).parents('.filterType').find('.filterName .remove').css('opacity', '1');
        $('#apply').css('animation-name', 'submitMark').css('animation-duration', '3s');
    });



    //#### FORM SUBMIT validation
    $('#formPost, #formEdit').submit(function(e) {
        //#### Валідація загрузки фото
        var itemImg = $(this).find('#list li');
        if ($(itemImg).length > 5) {
            $(itemImg).each(function() {
                if ($(this).index() >= 5) {
                    $(this).remove();
                }
            });
        }

        //#### Валідація блоку категорії
        if (($('.selectedCategory span').length < 2)) {
            $('#category').addClass('error');
        }

        //#### Валідація авто блоку
        if (($('.selectedAutos .auto').length == 0) || ($('.selectedAutos .auto').length > 3)) {
            $('.automobiles select').not('.disabled').addClass('error');
        }

        //#### Звертаємо увагу на рейтинг стану
        // б/у або новий
        if (!(usedItem.prop('checked')) && !(newItem.prop('checked'))) {
            $('.chooseCondition').addClass('error');
        }
        else {
            $('.chooseCondition').removeClass('error');
        }

        // рейтинг болтів
        if ($('.jq-ry-rated-group').width() == 0) {
            $('.rateYo').addClass('error');
        }
        else {
            $('.rateYo').removeClass('error');
        }

        //#### Якщо якесь поле містить клас помилки, то забороняємо відправку форми
        $('.interaction *').each(function() {
            if ($(this).hasClass('error')) {
                e.preventDefault();

                // Скролл догори, щоб побачити незаповнені поля
                // $('html, body').animate({ scrollTop: 0 }, 500);
            }
        });
    });
});