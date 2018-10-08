$('select[name="trasnport"]').bind("change", function () {
    $.ajax({
        url: 'get/marks/' + $('select[name="trasnport"]').val(),
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('select[name="brand"]').empty();
            $('select[name="brand"]').append('<option selected disabled hidden>Марка</option>');
            $('select[name="brand"]').removeClass('mark');

            $('select[name="model"]').empty();
            $('select[name="model"]').append('<option selected disabled hidden>Модель</option>');
            $('select[name="model"]').removeClass('mark');
            $('select[name="model"]').prop('disabled', true);
            $('select[name="model"]').addClass('disabled');

            for (var id in data) {
                $('select[name="brand"]').append('<option value="' +
                    data[id].id_mmark + '">' +
                    data[id].name + '</option>');
            }
        },
        error: function (error) {
            alert('error');
        }
    });
});

$('select[name="brand"]').bind("change", function () {
    $.ajax({
        url: 'get/models/' + $('select[name="trasnport"]').val()
            + '/' + $('select[name="brand"]').val(),
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('select[name="model"]').empty();
            $('select[name="model"]').append('<option selected disabled hidden>Модель</option>');
            $('select[name="model"]').removeClass('mark');

            for (var id in data) {
                $('select[name="model"]').append('<option value="' + data[id].id_mmodel +
                    '">' + data[id].name + '</option>');
            }
        },
        error: function (error) {
            alert('error');
        }
    });
});

$('select[name="region"]').bind("change", function () {
    $.ajax({
        url: 'get/districts/' + $('select[name="region"]').val(),
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('select[name="district"]').empty();
            $('select[name="district"]').append('<option selected disabled hidden>Район</option>');
            $('select[name="district"]').removeClass('mark');

            for (var id in data) {
                $('select[name="district"]').append('<option value="' +
                    id + '">' +
                    data[id] + '</option>');
            }
        },
        error: function (error) {
            alert('error');
        }
    });
});