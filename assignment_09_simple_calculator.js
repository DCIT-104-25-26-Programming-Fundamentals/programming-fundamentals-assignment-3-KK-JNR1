// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require("readline-sync");
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return null;
  return a / b;
}

function modulus(a, b) {
  if (b === 0) return null;
  return a % b;
}

function power(a, b) {
  return a ** b;
}

function getTwoNumbers() {
  const input1 = readline.question("Enter first number : ").trim();
  const num1 = parseFloat(input1);

  const input2 = readline.question("Enter second number: ").trim();
  const num2 = parseFloat(input2);

  if (isNaN(num1) || isNaN(num2)) {
    console.log("Error: Please enter valid numbers.");
    return null;
  }

  return { num1, num2 };
}

function printMenu() {
  console.log("\n============================");
  console.log("       SIMPLE CALCULATOR    ");
  console.log("============================");
  console.log("1. Addition");
  console.log("2. Subtraction");
  console.log("3. Multiplication");
  console.log("4. Division");
  console.log("5. Modulus");
  console.log("6. Exponentiation");
  console.log("7. Quit");
}

function main() {
  let isRunning = true;

  while (isRunning) {
    printMenu();
    const choice = readline.question("Select an operation (1-7): ").trim();

    if (choice === "7") {
      console.log("Goodbye!");
      isRunning = false;
      continue;
    }

    if (!["1", "2", "3", "4", "5", "6"].includes(choice)) {
      console.log("Invalid choice. Please select an option from 1 to 7.");
      continue;
    }

    const operands = getTwoNumbers();
    if (!operands) continue;

    const { num1, num2 } = operands;
    let result = null;

    switch (choice) {
      case "1":
        result = add(num1, num2);
        console.log(`Result: ${num1} + ${num2} = ${result.toFixed(2)}`);
        break;

      case "2":
        result = subtract(num1, num2);
        console.log(`Result: ${num1} - ${num2} = ${result.toFixed(2)}`);
        break;

      case "3":
        result = multiply(num1, num2);
        console.log(`Result: ${num1} * ${num2} = ${result.toFixed(2)}`);
        break;

      case "4":
        result = divide(num1, num2);
        if (result === null) {
          console.log("Error: Cannot divide by zero.");
        } else {
          console.log(`Result: ${num1} / ${num2} = ${result.toFixed(2)}`);
        }
        break;

      case "5":
        result = modulus(num1, num2);
        if (result === null) {
          console.log("Error: Cannot calculate modulus with zero.");
        } else {
          console.log(`Result: ${num1} % ${num2} = ${result.toFixed(2)}`);
        }
        break;

      case "6":
        result = power(num1, num2);
        console.log(`Result: ${num1} ** ${num2} = ${result.toFixed(2)}`);
        break;
    }
  }
}
main();
