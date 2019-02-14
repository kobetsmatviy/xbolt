$(function () {
    $("#formPost").validate({
        rules: {
            title: {
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