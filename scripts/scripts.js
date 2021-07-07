num1 = null
num2 = null
operator = null

function add() {
    return num1+num2
}

function subtract() {
    return num1-num2
}

function multiply() {
    return num1*num2
}

function divide() {
    return num1/num2
}

function operate() {
    if (operator == "+") {
        return add()
    }
    else if (operator == "-") {
        return subtract()
    }
    else if (operator == "*") {
        return multiply()
    }
    else if (operator == "/") {
        return divide()
    };

};