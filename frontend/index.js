document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    let currentInput = "";
    let previousInput = "";
    let operator = null;

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const handleNumber = (number) => {
        currentInput += number;
        updateDisplay(currentInput);
    };

    const handleOperator = (op) => {
        if (currentInput === "") return;
        if (previousInput !== "") {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = "";
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operator) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "/":
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = "";
        updateDisplay(currentInput);
    };

    const clear = () => {
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay("0");
    };

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            if (button.classList.contains("operator")) {
                handleOperator(value);
            } else if (value === "=") {
                calculate();
            } else if (value === "C") {
                clear();
            } else {
                handleNumber(value);
            }
        });
    });
});
