const modals = () => {
    // определяем нажал ли пользователь хоть одну кнопку
    let btnPressed = false;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {

        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();


        trigger.forEach(item => {

            item.addEventListener('click', (e) => {
                if (e.target) {e.preventDefault();}
              // удаление подарка с экрана
                if(destroy) {item.remove();}

                btnPressed = true;

                windows.forEach(item => {
                    item.style.display = 'none';
                    // добавление анимаций
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });


        close.addEventListener('click', () => {

            windows.forEach(item => {
                  item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {

            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });  
  }

  function showModalByTime (selector, time) {
      setTimeout(() => {
          let display;

          document.querySelectorAll('[data-modal]').forEach(item => {
              if (getComputedStyle(item).display !== 'none') {
                  display = 'block';
              }
          });

          if (!display) {
              document.querySelector(selector).style.display = 'block';
              document.body.style.overflow = 'hidden';
              let scroll = calcScroll();
              document.body.style.marginRight = `${scroll}px`;
          }
      }, time);
  }
  // хелпер для вычисления ширины скролла
  function calcScroll() {
      let div = document.createElement('div');
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();
      return scrollWidth;
  }

  function openByScroll (selector) {
      window.addEventListener('scroll', () => {
          // для старых браузеров
          // let scrollHeigh = Math.max(document.documentElement, document.body.scrollHeight);
          // Если кнопка не нажата и пользовтаель долистал до конца страницы то:
          if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= 
                              document.documentElement.scrollHeight-1)) {
              // иммитация клика
              document.querySelector(selector).click();
          }
      });
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll ('.fixed-gift');
  showModalByTime ('.popup-consultation', 60000);
};


export default modals;

