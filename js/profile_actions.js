$(document).ready(function(){
    AdaptiveCards();
    $( window ).resize(function() {
        AdaptiveCards();
    });

    function AdaptiveCards() {
        var rowWidth = $(".cards").width();
        var countItems = Math.floor(rowWidth / 245);
        var itemWidth = Math.floor(rowWidth / countItems) - 15;

        $(".partCard").css('max-width', itemWidth);
    }

    var dataURL = (window.location.href).toLowerCase();
    var categoryResult = 0;
    function GetCategory() {
        if (dataURL.indexOf('/workzone/catalog') > 0) categoryResult = 1;
        else if (dataURL.indexOf('/workzone/seek') > 0) categoryResult = 2;
        else if (dataURL.indexOf('/workzone/dis') > 0) categoryResult = 3;

        return categoryResult;
    }

    $('.glyphicon-remove').on('click', function() {
        $(this).parent().append(
            '<div class="deletePost">'+
                '<span class="caption">Вам вдалося продати запчастину?!</span>'+
                '<div class="vote">'+
                    '<span class="yes">Так<span class="glyphicon glyphicon-thumbs-up"></span></span>'+
                    '<span class="no">Ні<span class="glyphicon glyphicon-thumbs-down"></span></span>'+
                '</div>'+
            '</div>'+
            '<div id="overlayModal"></div>'+
            '<form id="formDelete" method="POST" enctype="multipart/form-data" action="/Offer/DelOffer?returnUrl=/workzone/'+(dataURL.split("workzone/")[1]).split("#")[0]+'">'+
                '<input type="hidden" name="offerID" value="'+$(this).closest('.partCard').attr('data-code')+'" />'+
                '<input type="hidden" name="offerStatus" value="" />'+
                '<input type="hidden" name="offerType" value="'+GetCategory()+'" />'+
            '</form>');
    });

    var overlay = true;
    $('.partCard').delegate('#overlayModal', 'click', function() {
        if (overlay) {
            $(this).remove();
            $('.deletePost').remove(); 
            $('#formDelete').remove();       
        }
    });

    $('.partCard').delegate('.yes, .no', 'click', function() {
        overlay = false;

        $(this).css({
            'width': '100%',
            'transition': 'all 1s'
        });
        $(this).next().css({
            'width': '0',
            'opacity': '0',
            'transition': 'all 1s'
        });
        $(this).prev().css({
            'width': '0',
            'opacity': '0',
            'transition': 'all 1s'
        });
    });
    $('.partCard').delegate('.yes', 'click', function() {
        $('input[name="offerStatus"]').attr('value', 1);
        
        setTimeout(function() {
            $('#formDelete').submit();
        }, 1000);
    });
    $('.partCard').delegate('.no', 'click', function() {
        $('input[name="offerStatus"]').attr('value', 0);
        
        setTimeout(function() {
            $('#formDelete').submit();
        }, 1000);
    });
});