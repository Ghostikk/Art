import {postData} from "../services/requests";

const forms = () => {

    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name = "upload"]');

  
    //Создаем объект с сообщениями, которые будет выводить пользователю
    const mess = {
          loading: 'Ожидайте, идет загрузка...',
          success: 'Спасибо! Скоро мы свяжемся с вами!',
          failure: 'Что-то пошло не так...',
          spinner: 'assets/img/spinner.gif',
          ok:'assets/img/ok.png',
          fail:'assets/img/fail.png',
    };
    
    // иммитация отправки на сервер
    const path = {
          designer: 'assets/server.php',
          question:'assets/question.php',
    };

    //проверка автозаполнения, уточнить работу
    inputs.forEach(item => {
        if(item.hasAttribute('name')) {
            item.autocomplete = "disabled";
        }
    //запрет ввода латиницы в поле name (нужно улучшить!)
        item.addEventListener('keypress', function (e) {
            if (item.getAttribute('name') === 'name' &&
                e.key.match(/[^а-яё]/ig)) {
                e.preventDefault();
                item.value = this.value.match(/[^а-яё]/ig);
            }
        });
    });

    // Очищаем импуты форм
    const clearInputs = () => {
        inputs.forEach(item => item.value = '');
        upload.forEach(item =>
            item.previousElementSibling.textContent = 'Файл не выбран');
    };

    //получение имени загруженного файла
   
    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const fileArr =  item.files[0].name.split('.');
            //обращаемся к первому загруженному файлу и разбиваем его на массив из двух частей с разделителем ".", далее обращаемся к первой части массиива и проверяем его длину и записываем в переменную dots
            fileArr[0].length > 7 ? dots = '...' : dots = '.';
            const name = fileArr[0].substring(0,8) + dots + fileArr[1];
            item.previousElementSibling.textContent = name;
            // console.group();
            console.log(item.files[0]);
            // console.log(name);
            // console.log(fileArr);
            // console.groupEnd();
        });
  });

    //
    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
                statusImg.setAttribute('src', mess.spinner);
                statusImg.classList.add('animated', 'fadeInUp', 'getCentrImg');
                // вот тут ОШИБКА? вставить нужно в конец StatusMessage, но не работает так
                // statusMessage.appendChild(statusImg);
                statusMessage.parentNode.appendChild(statusImg);

            let textMessage = document.createElement('div');
                textMessage.textContent = mess.loading;
                statusMessage.appendChild(textMessage);

            const formData = new FormData(item);

            let api;
            // если форма содержит класс .popup-design тогда отправка по адресу path.designer иначе path.question
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(result => {
                    console.log(result);
                    statusImg.setAttribute('src', mess.ok);
                    textMessage.textContent = mess.success;
                    // statusMessage.parentNode.remove(statusImg);
                })
                .catch(() => {
                    statusImg.setAttribute('src', mess.fail);
                    textMessage.textContent = mess.failure;
                })
                .finally(() => {
                    clearInputs();
                    
                    setTimeout(() => {
                        statusMessage.remove();
                        // это не обязательно при исправлении ошибки выше
                        statusImg.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
  });
};

export default forms;