$(function () {
    //#### Адаптивний вибір категорії
    $(window).resize(function() {
        AdaptiveCategory();
    });

    //#### Показуємо завантажені файли
    function FillImage() {
        $('#list img').each(function() {
            if ($(this).width() > $(this).height()) {
                $(this).removeClass().addClass('photoH');
            }
            else {
                $(this).removeClass().addClass('photoV');
            }
        })
    }
    $(document).ready(function() {
        if ($('#list li').length) {
            FillImage();
        }
    });
    $('#list').on('click', '.icons', function(e) {
        $(this).next().find('img').remove();
        $(this).next().find('input[name="photos"]').replaceWith('<input type="file" name="photos" accept="image/*" />');
        $(this).next().find('input[name="newPhotos"]').prop('checked', false);
        $(this).next().find('input[name="delPhotos"]').prop('checked', true);
        $(this).remove();

        e.preventDefault();
        e.stopPropagation();
    });
    function ShowFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function() {
                    theInput.closest('label').find('img').remove();
                    theInput.closest('li').find('span').remove();
                    if (this.width > this.height) {
                        theInput.closest('label').prepend('<img src="' +image.src+ '" class="photoH" />');
                    }
                    else {
                        theInput.closest('label').prepend('<img src="' +image.src+ '" class="photoV" />');
                    }
                    theInput.closest('label').find('input[name="newPhotos"]').prop('checked', true);
                    theInput.closest('li').prepend('<span class="glyphicon glyphicon-remove icons"></span>');
                };                
            };
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#list').on('change', 'input[name="photos"]', function(){
        theInput = $(this);
        $(this).closest('li').find('img').remove();
        $(this).closest('li').find('span').remove();
        $(this).closest('li').find('input[name="delPhotos"]').prop('checked', true);
        ShowFile(this);
    });

    //#### КАТЕГОРІЯ перемикач
    $('#toggleCategory').on('click', function(e) {
        // Перемикач станів
        if ($('#groups').css('display') == 'none') {
            $('#groups').css('display', 'flex');
        }
        else {
            $('#groups').css('display', 'none');
        }
        // Відміняємо поведінку button#toggleCategory
        e.preventDefault();
    });
    // Приховуємо/показуємо блоки з деталями, якщо має active
    var $groupButton = $('#groups input[type="button"]');
    $('#groups').delegate('input[type="button"]', 'click', function () {
        if ($(this).hasClass('active')) {
            $(this).next().hide();
            $groupButton.each(function () {
                $groupButton.removeClass('active');
            });
            if ($(this).hasClass('activeMark')) {
                $(this).removeClass('activeMark');
                $(this).addClass('mark');
            }
        }
        else {
            $groupButton.each(function () {
                $groupButton.removeClass('active');
            });
            $('.details').each(function () {
                $(this).hide();
            });
            $(this).addClass('active');
            $(this).next().show();

            $groupButton.each(function () {
                $groupButton.removeClass('activeMark');
            });

            if ($(this).hasClass('mark')) {
                $(this).addClass('activeMark');
            }
        }
    });
    // Якщо відмічений хоча б один radio у блоку details, то
    // змінити значення відповідної кнопки на mark
    $('#groups').delegate('.details input[type=radio]', 'click', function () {
        if ($(this).parents('.details').find('input[type=radio]:checked').length) {
            $('.details').prev().removeClass('mark');
            $(this).parents('.details').prev().addClass('mark');
            $(this).parents('.details').prev().addClass('activeMark');
            $('.selectedCategory').html('<span>'+$(this).parents('.details').prev().val()+'</span><span>'+
                $(this).closest('label').find('b').text()+'</span>');
            $('#toggleCategory').css('display', 'block');
            $('#groups').css('display', 'none').removeClass('error');
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
    });
    var newItem = $('.chooseCondition input[value="newItem"]').on('change', function() {
        $('.rateYo').rateYo("rating", 10);
        $('.chooseCondition').removeClass('error');
    });
    // Ініціалізація
    $('#rateInput').attr('value', $('.rateYo').rateYo("rating"));
    
    // Встановлення
    $(".rateYo").rateYo("option", "onSet", function () {
        if ($('.rateYo').rateYo("rating") > 0 && $('.rateYo').rateYo("rating") < 10) {
            usedItem.prop('checked', true);
        }
        if ($('.rateYo').rateYo("rating") > 0) {
            $('.rateYo').removeClass('error');
            $('.chooseCondition').closest('.interaction').next().find('.error').remove();
        }
        $('#rateInput').attr('value', $('.rateYo').rateYo("rating"));
    });
    

    //#### SELECT при зміні
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



    $('input[name="draft"]').on('click', function() {
        $('input[name="offerStatus"]').attr('value', 0);
    });
    $('input[name="publish"]').on('click', function() {
        $('input[name="offerStatus"]').attr('value', 1);
    });
    //#### FORM SUBMIT validation
    $('#formPost, #formEdit').submit(function(e) {
        //#### Валідація загрузки фото
        var itemImg = $(this).find('#list li');
        if ($(itemImg).length > 5) {
            $(itemImg).each(function() {
                if ($(this).index() >= 5) {
                    var rankDel = $(this).find('img').attr('data-rank');
                    $('#photoInputs input[data-rank="' +rankDel+ '"]').remove();
                    $(this).remove();
                }
            });
        }

        //#### Валідація блоку категорії
        if (($('.selectedCategory span').length < 2)) {
            $('#groups').addClass('error');
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
            }
        });
    });
});

function AdaptiveCategory() {
    if ($(window).width() > 750) {
        var rowWidth = $("#groups").width();
        var countItems = Math.floor(rowWidth / (200 + 5));
        var inputOrder = -1;
        var detailsOrder = 0;

        // Значення order для кожного input[type=button]
        $("#groups input[type=button]").each(function() {
            if (($(this).index()/2) % countItems == 0) {
                inputOrder += 2;
            }
            else {
                inputOrder++;
            }
            $(this).css("order", inputOrder);
            $(this).css("width", (rowWidth / countItems) - 15);
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
        $("#groups").children().each(function() {
            $(this).css("order", 0);
            $(this).css("width", "100%");
        });
        $(".details").css("width", "100%");
    }
}