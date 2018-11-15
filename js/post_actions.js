$(function () {
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

        //#### Валідація select
        $('select').each(function() {
            if ($(this).find('option').not(':first').is(':selected') == false) {
                $(this).css('box-shadow', '0 0 0 2px rgba(255, 0, 0, 0.3)');
            }
        });
    });

    //#### При зміні регіону
    $('select').change(function() {
        $(this).css('box-shadow', 'none');
    });

    //#### Якщо модель автомобіля :selected, то зберігаємо його
    $('select[name="model"]').change(function(e) {
        $(this).prop('disabled','disabled').addClass('disabled').removeClass('mark');
        $('.automobiles select').hide();
        if ($('.selectedAutos .auto').length < 4) {
            $('#addAuto').css('display', 'flex');
        }
        else {
            // *********************
        }
        
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
                        e.preventDefault();
                        e.stopPropagation();
                        break;
                    }
                }
            }
        });

        $('.selectedAutos').append('<span class="auto"></span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="transport"] option:selected').val()+'></span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="brand"] option:selected').val()+'>' +$('select[name="brand"] option:selected').text()+ '</span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="model"] option:selected').val()+'>' +$('select[name="model"] option:selected').text()+ '</span>');
        $('.selectedAutos .auto:last').append('<span class="remove"></span>');
    });
    $('#addAuto').on('click', function(e) {
        $('select[name="model"]').prop('disabled', false).removeClass('disabled');
        $('.automobiles select').show();
        $('#addAuto').css('display', 'none');
        e.preventDefault();
    });

    //#### Видаляємо обраний автобоміль при кліку на його блок
    $('.selectedAutos').delegate('.auto', 'click', function() {
        $(this).remove();
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

    //#### Змінюємо значення стану на установлене, при виведу курсору з елементу 
    $('input[type="range"]').on('mouseout', function() {
        $(this).val(state);
        ChangeState();
    });

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