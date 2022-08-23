const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea
    const fileInputs = document.querySelectorAll('[name="upload"]'),
          btnTop = document.querySelector(".calc .file_upload > button"),
          btnMidlle = document.querySelector('.popup-design .file_upload>button'),
          btnCalc = document.querySelector('.col-md-3 .file_upload>button');

    // создаем свой массив событий
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    //отменяем стандартное поведение и всплытие событий
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    //добавляем подсветку контура для дропа
    function highlight(item) {
        // closest возвращает ближайший родительский элемент (или сам элемент), который соответствует заданному CSS-селектору
        item.closest('.file_upload').style.border = "2px dashed black";
        item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        btnTop.style.border = "none";
        btnMidlle.style.border = "none";
        btnCalc.style.border = "none";

    }
     //отменяем подсветку
    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        btnTop.style.border = "2px dashed #c51abb";
        btnMidlle.style.border = "2px dashed #c51abb";
        btnCalc.style.border = "2px dashed #c51abb";
        // родитель с классом .calc_form
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if (item.closest('.col-md-3')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

  fileInputs.forEach(input => {
      input.addEventListener('drop', (e) => {
          input.files = e.dataTransfer.files;
          let dots;
          const arr = input.files[0].name.split('.');

          arr[0].length > 6 ? dots = "..." : dots = '.';
          const name = arr[0].substring(0, 6) + dots + arr[1];
          input.previousElementSibling.textContent = name;
      });
  });
};

export default drop;