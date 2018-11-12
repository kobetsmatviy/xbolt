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
    
    //#### Валідація загрузки фото
    $('form').submit(function() {
        var itemImg = $(this).find('#list li');

        if ($(itemImg).length > 5) {
            alert('Ви перевищили ліміт фото!');

            $(itemImg).each(function() {
                if ($(this).index() >= 5) {
                    $(this).remove();
                }
            });
            return false;
        }
        else if($(itemImg).length <= 0) {
            $('#list').css('box-shadow', '0 0 0 2px rgba(255, 0, 0, 0.3)');
            return false;
        }
    });
    // При додаванні фото, видаляємо клас помилки
    $('#uploadImg').change(function() {
        $('#list').css('box-shadow', 'none');
        $(this).removeClass('error').addClass('valid').attr('aria-invalid', 'false');
        $(this).next().hide();
    });

    // Повзунок input[type=range] для стану
    var state = 0;
    $('input[type="range"]').on('mouseenter mousemove', function(e) {
        $(this).val((e.pageX - $(this).offset().left) / ($(this).outerWidth() / 10));

        $(this).on('click', function() {
            state = $(this).val();
            console.log(state);
            $(this).removeClass('error').addClass('valid').attr('aria-invalid', 'false');
            $(this).next().hide();
        });

        ChangeState();
    });

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