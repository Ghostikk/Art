const sliders = (slides, direction, prev, next) => {
    let slideIndex = 1,
        paused = false;

    const items = document.querySelectorAll(slides);

    function showSlides(n=1) {
        if(n > items.length) {
            slideIndex = 1;
        }

        if(n < 1) {
            slideIndex = items.length;
        }

        items.forEach(elem => {
            elem.classList.add('animated');
            elem.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    //для реализации prev, next
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // блок обработки ошибок
    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex-1].classList.remove('slideInLeft');
            items[slideIndex-1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1); 
            items[slideIndex-1].classList.remove('slideInRight');
            items[slideIndex-1].classList.add('slideInLeft');
        });

    } catch(error) {
        console.log(error);
    }

    function activatedAnimated() {
         // реализация вертикального слайдера
        if(direction === 'vertical') {
            paused = setInterval(function() {
                  plusSlides(1);
                  items[slideIndex-1].classList.add('slideInDown');
            }, 3000);
        } else {
              paused = setInterval(function() {
                  plusSlides(1);
                  items[slideIndex-1].classList.remove('slideInRight');
                  items[slideIndex-1].classList.add('slideInLeft');
            }, 3000);
        }
    }
    activatedAnimated();
    // остановка горизонтального слайдера при наведении мыши
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activatedAnimated();
    });
};

export default sliders;