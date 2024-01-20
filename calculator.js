let currentInput = '';
let operator = '';
let result = 0;

function clearDisplay() {
    currentInput = '';
    operator = '';
    result = 0;
    updateDisplay();
}


function deleteLast() {
    if (currentInput.length > 0) {
        // Remove the last character
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (operator.length > 0) {
        // Remove the operator if no operand is present
        operator = '';
        updateDisplay();
    } else if (result !== 0) {
        // Remove one character from the result
        result = Math.floor(result / 10);
        updateDisplay();
    }
}

function calculatePercentage() {
    if (currentInput !== '') {
        const inputNum = parseFloat(currentInput);
        result = result * (inputNum / 100);
        currentInput = result.toString();
        updateDisplay();
    }
}

function appendToDisplay(value) {
    currentInput += value;
    updateDisplay();
}

function setOperator(op) {
    if (currentInput !== '') {
        if (operator === '%' && op !== '%') {
            calculatePercentage();
        } else {
            operator = op;
            result = parseFloat(currentInput);
            currentInput = '';
            updateDisplay();
        }
    }
}

function calculateResult() {
    if (currentInput !== '') {
        const inputNum = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result += inputNum;
                break;
            case '-':
                result -= inputNum;
                break;
            case '*':
                result *= inputNum;
                break;
            case '/':
                if (inputNum !== 0) {
                    result /= inputNum;
                } else {
                    alert('Cannot divide by zero!');
                    clearDisplay();
                    return;
                }
                break;
            case '%':
                calculatePercentage();
                return; // Avoid resetting currentInput and operator
        }
        currentInput = '';
        operator = '';
        updateDisplay();
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = currentInput !== '' ? currentInput : result;
}