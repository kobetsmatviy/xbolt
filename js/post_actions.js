$(function () {
    // Показуємо завантажені файли
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
    
    // Валідація загрузки фото
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
        else if(($(itemImg).length > 0) && ($(itemImg).length <= 5)) {
            alert('Відправляємо');
        }
        else {
            alert('Фото не завантажене');
            return false;
        }
    });

    // Стилізація input[type=range] для стану
    // $('input[type="range"]').mouseover(function() {
    //     $(this).val(5);
    // });
});