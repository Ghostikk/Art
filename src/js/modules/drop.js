const drop = () => {
  // События при драг & дроп функциональности: drag*, dragend*, dragenter - объект над dropArea, dragexit*, dragleave - объект за пределами dropArea, dragover - объект в пределах dropArea, dragstart*, drop - объект "упал" в dropArea (* - события у элементов, которые перетаскивают)
    const fileInputs = document.querySelectorAll('[name="upload"]');
  // свой массив сробытий
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach (eventName => {
        fileInputs.forEach (input => {
            input.addEventListener (eventName, preventDefault, false);
        });
    });
    // отмена стандартного поведения
    function preventDefault (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    // подсвечивания элементов
    function highlight (item) {
      //возвращает ближайший родительский элемент (или сам элемент), который соответствует заданному CSS-селектору 
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }
    // убираем подсветку с элементов
     function unHighlight (item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = '#ededed';
    }

    ['dragenter', 'dragover'].forEach (eventName => {
        fileInputs.forEach (input => {
            input.addEventListener (eventName, () => highlight(input), false);
        });
    });
  
    ['dragleave', 'drop'].forEach (eventName => {
        fileInputs.forEach (input => {
            input.addEventListener (eventName, () => unHighlight(input), false);
        });
    });

};

export default drop;