num1 = ""
num2 = ""
operator = ""
result = ""

function add() {
    return Number(num1)+Number(num2)
}
function subtract() {
    return Number(num1)-Number(num2)
}
function multiply() {
    return Number(num1)*Number(num2)
}
function divide() {
    return Number(num1)/Number(num2)
}
function operate() {
    if (operator == "+") {
        result = add()
        postCalc()
    }
    else if (operator == "-") {
        result = subtract()
        postCalc()
    }
    else if (operator == "x") {
        result = multiply()
        postCalc()
    }
    else if (operator == "/") {
        result = divide()
        postCalc()
    };
};
function cleanResult() {
    if (result.countDigits() >= 12) {
        temp = result.toString().slice(0,12)
        result = Number(temp)
    }
}
function postCalc() {
    num1 = String(result)
    num2 = ""
    operator = ""
    cleanResult()
    updateDisplay(4)
    removeClicked()
}

function clear() {
    num1 = "";
    num2 = "";
    operator = "";
    result = "";
    updateDisplay(1);
    removeClicked();
}

function evaluateNumber(n) {
    if (operator) {
        if (num2.includes('.') && n == '.') {
            updateDisplay(3)
        } else {
            num2 += n
            updateDisplay(3)
        }
    }
    else {
        if (num1.includes('.') && n == '.') {
            updateDisplay(1)
        } else {
            num1 += n
            updateDisplay(1)
        }
    }
}

function evaluateOperator(n) {
    if (num2) {
        operate()
        operator = n
        updateDisplay(2)
    }
    
    else if (num1) {
        operator = n
        updateDisplay(2)
    }
    else {
        num1 = 0
        operator = n
    }
}

function evaluateFunction(n) {
    if (n == "=") {
        if (operator == "÷" && num2 == "0") {
            alert("You cannot divide by zero")
        } else {operate()}
    }
    else if (n == "C") {
        clear()
    }
    else if (n == "Del") {
        if (num2) {
            num2 = num2.slice(0,-1);
            updateDisplay(3);
        }
        else if (num1 && !operator && !result) {
            num1 = num1.slice(0,-1)
            updateDisplay(1)
        }
    }
}

function updateDisplay(ver) {
    if (ver == 1) {
        display.textContent = num1
    }
    else if (ver == 2) {
        display.textContent = num1+" "+operator
    }
    else if (ver == 3) {
        display.textContent = num1+" "+operator+" "+num2
    }
    else if (ver == 4) {
        display.textContent = result
    }
}

function updateClicked(n) {
    n.classList.add('clicked')
}

function removeClicked() {
    allOperators.forEach (operator => {
        operator.classList.remove('clicked')
    })
}

const allOperators = document.querySelectorAll(".operator")
const allNumbers = document.querySelectorAll(".number")
const allFunctions = document.querySelectorAll(".function")
const display = document.querySelector(".display-inner")

allOperators.forEach(operator => {
    operator.addEventListener("click", () => {
        evaluateOperator(operator.value)
        removeClicked()
        updateClicked(operator)
    })
});

allNumbers.forEach(number => {
    number.addEventListener("click", () => {
        evaluateNumber(number.value)
    })
});

allFunctions.forEach(funct => {
    funct.addEventListener("click", () => {
        evaluateFunction(funct.value)
    })
});

function convertKeyPress(n) {
    if (n == 49) {evaluateNumber(1)}
    else if (n == 50) {evaluateNumber(2)}
    else if (n == 51) {evaluateNumber(3)}
    else if (n == 52) {evaluateNumber(4)}
    else if (n == 53) {evaluateNumber(5)}
    else if (n == 54) {evaluateNumber(6)}
    else if (n == 55) {evaluateNumber(7)}
    else if (n == 56) {evaluateNumber(8)}
    else if (n == 57) {evaluateNumber(9)}
    else if (n == 48) {evaluateNumber(0)}
    else if (n == 190) {evaluateNumber('.')}
    else if (n == 191) {evaluateOperator('÷')}
    else if (n == 187) {evaluateOperator('+')}
    else if (n == 189) {evaluateOperator('-')}
    else if (n == 88) {evaluateOperator('x')}
    else if (n == 187) {evaluateFunction('=')}
    else if (n == 13) {evaluateFunction('=')}
    else if (n == 67) {evaluateFunction('C')}
    else if (n == 8) {evaluateFunction('Del')}
}
document.addEventListener("keydown", () => {
    key = window.event.keyCode

    if (key == 191) {
        temp = document.querySelector("#divide")
        evaluateOperator(temp.value)
        removeClicked()
        updateClicked(temp)
    }
    else if (key == 187) {
        temp = document.querySelector("#add")
        evaluateOperator(temp.value)
        removeClicked()
        updateClicked(temp)
    }
    else if (key == 189) {
        temp = document.querySelector("#subtract")
        evaluateOperator(temp.value)
        removeClicked()
        updateClicked(temp)
    }
    else if (key == 88) {
        temp = document.querySelector("#multiply")
        evaluateOperator(temp.value)
        removeClicked()
        updateClicked(temp)
    }
    else {
        convertKeyPress(key)
    }
});

Number.prototype.countDigits = function () {
    return this.toString().length
}