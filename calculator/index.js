document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons input[type="button"]');
    const display = document.getElementById('display');

    function factorial(n) {
        if (!Number.isInteger(n) || n < 0) {
            return 'Error: factorial only for non-negative integers';
        }
        if (n === 0) {
            return 1;
        }
        const result = n * factorial(n - 1);
        return result;
    }

    function safeParseFloat(value) {
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    }

    function preprocessThings(expr) {
        expr = expr.replace(/\|\|([^|]+)\|\|/g, 'Math.abs($1)');
        expr = expr.replace(/\|([^|]+)\|/g, 'Math.abs($1)');
        expr = expr.replace(/(\d+)!/g, 'factorial($1)');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
        expr = expr.replace(/(\d+(\.\d+)?|\([^()]+\))\s*\^\s*(\d+(\.\d+)?|\([^()]+\))/g, (match) => {
            return match.replace('^', '**');
        });
        expr = expr.replace(/floor\(/g, 'Math.floor(');
        expr = expr.replace(/ceil\(/g, 'Math.ceil(');
        expr = expr.replace(/π/g, `(${Math.PI})`);
        return expr;
    }

    function handleInput(value) {
        const displayValue = display.value.trim();

        switch (value) {
            case 'AC':
                display.value = '';
                break;

            case 'C':
                display.value = display.value.slice(0, -1);
                break;

            case '√x':
                display.value += 'sqrt(';
                break;

            case 'log':
                display.value += 'log(';
                break;

            case '|x|':
                display.value += '|';
                break;

            case '⌈x⌉':
                display.value += 'ceil(';
                break;

            case '⌊x⌋':
                display.value += 'floor(';
                break;

            case 'x!':
                display.value += '!';
                break;

            case '+/-':
                display.value += '(-';
                break;

            case 'x²':
                display.value += '^2';
                break;

            case '~': {
                try {
                    let expression = display.value;
                    expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
                    expression = preprocessThings(expression);
                    let result = eval(expression);
                    display.value = Math.round(result);
                } catch {
                    display.value = 'Error: Invalid input';
                }
                break;
            }

            case '=':
                try {
                    let expression = display.value.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
                    expression = preprocessThings(expression);
                    display.value = eval(expression);
                } catch {
                    display.value = 'Error: Invalid expression';
                }
                break;

            default:
                display.value += value;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.value)
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
            handleInput(key);
            event.preventDefault();
        } else if (key === 'Enter' || key === '=') {
            handleInput('=');
            event.preventDefault();
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
            event.preventDefault();
        } else if (key.toLowerCase() === 'k') {
            handleInput('AC');
            event.preventDefault();
        } else if (key === '|') {
            handleInput('|');
            event.preventDefault();
        } else if (key === '!') {
            handleInput('!');
            event.preventDefault();
        } else if (key === 'l') {
            handleInput('l');
            event.preventDefault();
        } else if (key === 'o') {
            handleInput('o');
            event.preventDefault();
        } else if (key === 'g') {
            handleInput('g');
            event.preventDefault();
        } else if (key === 's') {
            handleInput('s');
            event.preventDefault();
        } else if (key === 'q') {
            handleInput('q');
            event.preventDefault();
        } else if (key === 'r') {
            handleInput('r');
            event.preventDefault();
        } else if (key === 't') {
            handleInput('t');
            event.preventDefault();
        } else if (key === '^') {
            handleInput('^');
            event.preventDefault();
        } else if (key === 'c') {
            handleInput('c');
            event.preventDefault();
        } else if (key === 'e') {
            handleInput('e');git 
            event.preventDefault();
        } else if (key === 'i') {
            handleInput('i');
            event.preventDefault();
        } else if (key === 'f') {
            handleInput('f');
            event.preventDefault();
        }
    });
});
