import { postData } from "./services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]'),
        selects = document.querySelectorAll('select');
    
    const message = {
        loading: 'Loading...',
        success: 'Thanks! We will contact you as soon as possible',
        failure: 'Something went wrong...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php',
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');

            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.append(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.append(textMessage);

            const formData = new FormData(item);
            selects.forEach(select => {
                formData.append(select.getAttribute('id'), select.options[select.selectedIndex].text);
            });
            let api;
            item.closest('.popup-design') || item.classList.contains('calc__form') ? api = path.designer : api = path.question;

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    console.log('hi');
                    statusImg.setAttribute('src', message.ok);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    inputs.forEach(input => {
                        input.value = "";
                    });
                    upload.forEach(input => {
                        input.previousElementSibling.textContent = "File has not been chosen";
                    });
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files);
            let dots;
            const splittedName = item.files[0].name.split('.');
            splittedName[0].length > 5 ? dots = '...' : dots = '.';
            const name = splittedName[0].substring(0, 6) + dots + splittedName[1];
            item.previousElementSibling.textContent = name;
        });
    })
}

export default forms;