$(function () {
    // var $uploadCrop = $('#photoCrop');    
    // function readFile(input) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();          
    //         reader.onload = function (e) {
    //             $uploadCrop.croppie('bind', {
    //                 url: e.target.result
    //             });
    //             $('.crop').css('display', 'flex');
    //             $('#overlay').css('display', 'block');
    //         }           
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }

    // $uploadCrop.croppie({
    //     viewport: {
    //         width: 150,
    //         height: 150,
    //         type: 'circle'
    //     },
    //     boundary: {
    //         width: 300,
    //         height: 300
    //     }
    // });

    // $('#uploadPhoto').on('change', function () { readFile(this); });
    // $('#getPhoto').on('click', function (ev) {
    //     $uploadCrop.croppie('result', {
    //         type: 'canvas',
    //         size: 'original'
    //     }).then(function (resp) {
    //         $('#readyPhoto').css('background-size', 'cover');
    //         $('#readyPhoto').css('background-image', 'url('+resp+')');
    //     });

    //     $('.crop').css('display', 'none');
    //     $('#overlay').css('display', 'none');

    //     resetInputFile();
    // });
    // $('#cancelCrop, #overlay').on('click', function() {
    //     $('.crop').css('display', 'none');
    //     $('#overlay').css('display', 'none');
    //     resetInputFile();
    // });

    // function resetInputFile() {
    //     var $el = $('#uploadPhoto');
    //     $el.wrap('<form>').closest('form').get(0).reset();
    //     $el.unwrap();
    // }

    $('input[type=tel]').change(function() {
        $('input[type=submit]').removeClass('disabled');
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
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="mtype"] option:selected').val()+'></span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="brand"] option:selected').val()+'>' +$('select[name="brand"] option:selected').text()+ '</span>');
        $('.selectedAutos .auto:last').append('<span id='+$('select[name="model"] option:selected').val()+'>' +$('select[name="model"] option:selected').text()+ '</span>');
        $('.selectedAutos .auto:last').append('<span class="remove"></span>');
        $('.selectedInputs').append('<input type="text" name="mtype_send" readonly value="'+$('select[name="mtype"] option:selected').val()+'" data-select="'+$('.selectedAutos .auto').length+'" />');
        $('.selectedInputs').append('<input type="text" name="brand_send" readonly value="'+$('select[name="brand"] option:selected').val()+'" data-select="'+$('.selectedAutos .auto').length+'" />');
        $('.selectedInputs').append('<input type="text" name="model_send" readonly value="'+$('select[name="model"] option:selected').val()+'" data-select="'+$('.selectedAutos .auto').length+'" />');

        $(this).removeClass('mark');
        $('.automobiles select').removeClass('error').hide();
        CheckAutoExist();

        // Дозволити Зберігання форми
        $('input[type=submit]').removeClass('disabled');
    });
    $('#addAuto').on('click', function(e) {
        $('.automobiles select').show();
        $('#addAuto').css('display', 'none');
        e.preventDefault();
    });
    // Видаляємо авто при кліку на його блок
    $('.selectedAutos').delegate('.auto', 'click', function() {
        $('.selectedInputs input[data-select="'+($(this).closest('.auto').index() + 1)+'"]').remove();
        $(this).remove();
        CheckAutoExist();

        if ($('.selectedAutos .auto').length <= 0) {
            $('#addAuto').trigger('click');
            $('select[name="model"]').removeClass('mark').addClass('error').css('box-shadow', '0 0 0 2px rgba(255,0,0,.3)');
        }

        // Дозволити Зберігання форми
        $('input[type=submit]').removeClass('disabled');
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

    // Зберігання при зміні місця знаходження
    $('select[name=town]').change(function() {
        $('input[type=submit]').removeClass('disabled');
    });

    //#### Показуємо блок зі зміною пароля
    $('#showPswdBlock').on('click', function(e) {
        $('.hidePassword').css('display', 'flex');
        $(this).hide();
        e.preventDefault();
    });
    //++++ Якщо select значення змінено, позначаємо mark
    $('select').change(function () {
        $(this).addClass('mark');
        $(this).next().removeClass('disabled').prop('disabled', false);
    });

    //#### FORM SUBMIT validation
    $('#formSettings').submit(function(e) {
        //#### Якщо якесь submit містить клас disabled, то забороняємо відправку форми
        if ($('input[type=submit]').hasClass('disabled')) {
            e.preventDefault();
        }
    });
});