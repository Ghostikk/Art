const showMoreStyles = (trigger, style) => {
    const cards = document.querySelectorAll(style),
          btn = document.querySelector(trigger);


    cards.forEach(item => {
        item.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener ('click', () => {
        cards.forEach(item => {
            item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        btn.style.display = 'none';
    });

};

export default showMoreStyles;