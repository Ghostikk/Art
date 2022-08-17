const meMask = (selector) => {

    let setCursorPosition = (position, element) => {
        element.focus();

        if(element.setSelectionRange) {
            element.setSelectionRange(position, position);
        } else if (element.createTextRange) {

            let range = element.createTextRange();

            range.collapse(true);
            range.moveEnd('character', position);
            range.moveStart('character', position);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i= 0,
            // получаем все НЕ цифры и меняем на пустую строку
            def = matrix.replace(/\D/g, ''),
            // значение, который пользователь вводит со страницы
            val = this.value.replace(/\D/g, '');
        // запрет пользователю на удаление "+7"
        if(def.length >= val.length) {val = def;}
        // /./ - проход по всем элементам строки, a - является каждым элементом строки
        this.value = matrix.replace(/./g, function(a) {
            //[_\d] проверка, ялвяется ли элемент входящим в цифровой диапазон
            return /[_\d]/.test(a) && i < val.length ?
                   val.charAt(i++) : i >= val.length ? '' : a;
        });

        // проверка нахождения курсора мыши, если он на импуте то, перемещаем его в нужное место, если за пределом импута и число введенных символов равно 2, то очищаем импут
        if(event.type === 'blur') {
            if(this.value.length == 2) {
                this.value = '';
        } else {
            setCursorPosition(this.value.length, this);
        }
    }
  }
    let inputs = document.querySelectorAll(selector);
    
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};


export default meMask;