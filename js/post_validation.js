$(function () {
    $("#formPost").validate({
        rules: {
            first_name: {
                required: true,
                minlength: 2
            },
            telephone: {
                required: true,
                minlength: 10,
                maxlength: 13
            },
            caption: {
                required: true,
                minlength: 5
            },
            price: {
                required: true,
                min: 1,
                max: 9999999
            },
            condition: {
                required: true
            },
            region: {
                required: true
            },
            town: {
                required: true
            }
        },
        errorPlacement: function(error, element) {
            return true;
        }
    });
});


$(function () {
    $('input[name=first_name]').keyup(function(e) {
        e.preventDefault();
        var res = /[^а-яА-Яa-zA-ZїЇєЄіІёЁґ ]/g.exec(this.value);
        this.value = this.value.replace(res, '');
    });
    $('input[name=telephone]').keyup(function(e) {
        e.preventDefault();
        var res = /[^0-9+]/g.exec(this.value);
        this.value = this.value.replace(res, '');
    });
});
