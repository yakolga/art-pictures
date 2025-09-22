const modals = () => {
    let btnClicked;
    function toggleModal(trigger, modal, destroy = false) {
        const triggerElement = document.querySelectorAll(trigger),
                modalElement = document.querySelector(modal),
                modalCloseButton = modalElement.querySelector('.popup-close'),
                windows = document.querySelectorAll('[data-modal]'),
                scroll = calcScroll();

        if (!triggerElement || !modalElement) return

        triggerElement.forEach(elem => {
            if (elem.classList.contains('disable')) return

            elem.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnClicked = true;

                if (destroy) {
                    elem.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modalElement.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        })

        modalCloseButton.addEventListener('click', () => {
            modalElement.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.marginRight = '0px';

            windows.forEach(item => {
                item.style.display = 'none';
            });
        });

        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                modalElement.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.style.marginRight = '0px';

                windows.forEach(item => {
                    item.style.display = 'none';
                });
            }
        })
    }

    function showModalByTime(modal, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(modalElement => {
                if (getComputedStyle(modalElement).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(modal).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }

        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

            if (!btnClicked && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    toggleModal('.button-design', '.popup-design');
    toggleModal('.button-consultation', '.popup-consultation');
    toggleModal('.fixed-gift', '.popup-gift', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 10000);
};

export default modals;