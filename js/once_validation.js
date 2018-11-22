$(function () {
    $("#formOnce").validate({
        rules: {
            first_name: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            first_name: {
                required: "Запишіть як до вас мають звертатися",
                minlength: jQuery.validator.format("Щонайменше {0} символів")
            }
        },
        errorPlacement: function(error, element) {
            element.each(function() {
                var attrName = $(this).attr('name');
                var item = $(this).prop('name', attrName);

                $(this).closest('.interaction').next().find('.advice').remove();
                error.appendTo($(this).closest('.interaction').next());
            });
        }
    });
});


$(function () {
    $('input[name=first_name]').keyup(function(e) {
        var regex = /^[a-zA-Z0-9@]+$/;
        if (regex.test(this.value) !== true)
        this.value = this.value.replace(/[^a-zA-Z0-9@]+/, '');
    });
});
