import { postData } from "./services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(fileInput => {
            fileInput.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid #c51abb';
    }

    function unHighlight(item) {
        item.closest('.file_upload').style.border = 'none';
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(fileInput => {
            fileInput.addEventListener(eventName, () => highlight(fileInput), false);
        });
    });

    ['drop', 'dragleave'].forEach(eventName => {
        fileInputs.forEach(fileInput => {
            fileInput.addEventListener(eventName, () => unHighlight(fileInput), false);
        });
    });

    const message = {
        success: 'Thanks! We have got your file',
        failure: 'Something went wrong...',
        default: 'File not selected',
    };

    fileInputs.forEach(fileInput => {
        fileInput.addEventListener('drop', (e) => {
            fileInput.files = e.dataTransfer.files;

            let dots;
            const splittedName = fileInput.files[0].name.split('.');
            splittedName[0].length > 5 ? dots = '...' : dots = '.';
            const name = splittedName[0].substring(0, 6) + dots + splittedName[1];
            fileInput.previousElementSibling.textContent = name;

            if (e.target.closest('.main')) {
                const element = e.target;
                const formData = new FormData();
                formData.append(element.type, element.value);

                postData('assets/server.php', formData)
                .then(res => {
                    element.previousElementSibling.textContent = message.success;
                })
                .catch(() => {
                    element.previousElementSibling.textContent = message.failure;
                })
                .finally(() => {
                    element.value = "";
                    setTimeout(() => {
                        element.previousElementSibling.textContent = message.default;
                    }, 5000);
                });
            }
        });
    })
}

export default drop