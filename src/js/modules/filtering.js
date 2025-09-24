const filter = (buttonsContainer, buttonsSelector, cardsWrapper, noResultSelector) => {
    const buttons = document.querySelector(buttonsContainer),
        cards = document.querySelector(cardsWrapper),
        noResultBlock = document.querySelector(noResultSelector);

    buttons.addEventListener('click', function(e) {
        const target = e.target;

        if (target && target.tagName === buttonsSelector) {
            buttons.querySelectorAll('li').forEach(button => {
                button.classList.remove('active');
            });

            target.classList.toggle('active');
        
            const targetClass = target.className.split(' ')[0];
          
            cards.querySelectorAll('.portfolio-block').forEach((card) => {
                card.style.display = 'none';
                card.classList.remove('animated', 'fadeIn');

                noResultBlock.style.display = 'none';
                noResultBlock.classList.remove('animated', 'fadeIn');
                
                if (card.classList.contains(targetClass)) {
                    card.style.display = "flex";
                    card.classList.add('animated', 'fadeIn');
                }
            });

            if (!cards.querySelector(`.${targetClass}`)) {
                noResultBlock.style.display = 'block';
                noResultBlock.classList.add('animated', 'fadeIn');
            }
        }
    });
}

export default filter;