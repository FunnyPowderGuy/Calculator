document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons input[type="button"]');
    const display = document.getElementById('display');

    function factorial(n) {
        if(Number.isInteger(n)){
            if (n < 0){
                return 'Error. You cannot use factorial for that!'
            }
            else if (n == 0) {
                return 1;  
            }
            else {
                result = (n * factorial(n - 1));  
                return result;
            }
        } else {
            return 'Error. You cannot use factorial for that!'
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;
            const displayValue = display.value;

            switch(value){
                case 'AC':
                    display.value = '';
                    break;
                case '√x':
                    if(displayValue) {
                        const number = parseFloat(displayValue);
                        if(number >= 0){
                            display.value = Math.sqrt(number);
                        } else {
                            display.value = 'Error. Square root cannot be negative!';
                        }
                    }
                    break;
                case '=':
                    display.value = eval(display.value);
                    break;
                case 'X':
                    display.value -= display.value;
                case 'log':
                    if(displayValue) {
                        const number = parseFloat(displayValue);
                        if(number > 0) {
                            display.value = Math.log10(number);
                        } else {
                            display.value = 'Error. The argument must be bigger than 0!';
                        }
                    }
                    break;
                case '|x|':
                    display.value = Math.abs(display.value);
                    break;
                case '⌈x⌉':
                    display.value = Math.ceil(display.value);
                    break;
                case '⌊x⌋':
                    display.value = Math.floor(display.value);
                    break;
                case 'x!':
                        const num = parseFloat(display.value);
                        const fact = factorial(num);
                        if (typeof fact === 'string') {
                            display.value = fact;
                        } else {
                            display.value = fact;
                        }
                        break;

                default:
                    display.value += value;
            }
        });
    });
});
