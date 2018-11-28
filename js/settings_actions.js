$(function () {
    //#### Показуємо завантажені файли
    // function showFile(e) {
    //     var files = e.target.files;
    //     for (var i = 0, f; f = files[i]; i++) {
    //         if (!f.type.match('image.*')) continue;
    //         var fr = new FileReader();
    //         fr.onload = (function(theFile) {
    //             return function(e) {
    //                 var ph = document.getElementById('photoCrop');
    //                 ph.innerHTML = "<img src='" + e.target.result + "' />";
    //                 ph.style.backgroundImage = 'none';
    //             };
    //         })(f);
        
    //         fr.readAsDataURL(f);
    //     }
    // }
    // document.getElementById('uploadPhoto').addEventListener('change', showFile, false);

    var $uploadCrop = $('#photoCrop');
    
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();          
            reader.onload = function (e) {
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                });
                $uploadCrop.addClass('ready');
                $uploadCrop.show();
            }           
            reader.readAsDataURL(input.files[0]);
        }
    }

    $uploadCrop.croppie({
        viewport: {
            width: 150,
            height: 150,
            type: 'circle'
        },
        boundary: {
            width: 300,
            height: 300
        }
    });

    $('#uploadPhoto').on('change', function () { readFile(this); });
    $('#getPhoto').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'original'
        }).then(function (resp) {
            $('#readyPhoto').css('background-size', 'cover');
            $('#readyPhoto').css('background-image', 'url('+resp+')');
        });
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
        $('.automobiles select').hide();
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
    // Перевірка існування блоку .auto
    function CheckAutoExist() {
        if ($('.selectedAutos .auto').length < 5) {
            $('#addAuto').css('display', 'flex');
        }
        else {
            return false;
        }
    }
    
    //++++ Якщо select значення змінено, позначаємо mark
    $('select').change(function () {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
    });
});