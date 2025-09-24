const calc = (size, material, options, promocode, result, input) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result),
        priceInput = document.querySelector(input);

    let sum = 0;

    function calcFunc()  {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Please, choose size and material of the picture';
        } else if (promocodeBlock.value === 'IWANTIMPORTANT') {
            resultBlock.textContent = Math.round(sum * 0.7);
            priceInput.value = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            priceInput.value = sum;
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
}

export default calc