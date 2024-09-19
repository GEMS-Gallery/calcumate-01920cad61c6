import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "./calculator.did.js";

const agent = new HttpAgent();
const canisterId = "your-canister-id"; // Replace with your actual canister ID
const calculator = Actor.createActor(idlFactory, { agent, canisterId });

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

    const calculate = async () => {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        try {
            switch (operator) {
                case "+":
                    result = await calculator.add(prev, current);
                    break;
                case "-":
                    result = await calculator.subtract(prev, current);
                    break;
                case "*":
                    result = await calculator.multiply(prev, current);
                    break;
                case "/":
                    const divisionResult = await calculator.divide(prev, current);
                    result = divisionResult !== null ? divisionResult : "Error";
                    break;
                default:
                    return;
            }
            currentInput = result.toString();
            operator = null;
            previousInput = "";
            updateDisplay(currentInput);
        } catch (error) {
            console.error("Calculation error:", error);
            updateDisplay("Error");
        }
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
