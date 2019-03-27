$(function () {
    $("#formRegistration").validate({
        rules: {
            email: {
                email: true
            },
            phone: {
                minlength: 10,
                maxlength: 13
            },
            password: {
                required: true,
                minlength: 6
            },
            first_name: {
                required: true,
                minlength: 2
            }
        },
        errorPlacement: function(error, element) {
            return true;
        }
    });
});


$(function () {
    $(document).ready(function() {
        SwitchDisable();
    });

    $('input[name=email]').keyup(function(e) {        
        SwitchDisable();
    });
    $('input[name=phone]').keyup(function(e) {
        var res = /[^0-9+]/g.exec(this.value);
        this.value = this.value.replace(res, '');

        SwitchDisable();
    });
    $('input[name=first_name]').keyup(function(e) {
        var res = /[^а-яА-Яa-zA-ZїЇєЄіІёЁґ ]/g.exec(this.value);
        this.value = this.value.replace(res, '');
    });

    // Валідація
    $('#formLogin, #formRegistration').submit(function(e) {
        SwitchDisable();
    });
});

function SwitchDisable() {
    if( $('input[name=email]').val() ) {
        $('input[name=phone]').prop({required: false, readonly: true}).addClass('disabled');
    }
    else if( $('input[name=phone]').val() ) {
        $('input[name=email]').prop({required: false, readonly: true}).addClass('disabled');
    }
}