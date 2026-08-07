// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let rowStr = '';
        for (let j = 0; j < matrix[i].length; j++) {
           
            let value = String(matrix[i][j]);
            while (value.length < 5) {
                value = ' ' + value;
            }
            rowStr += value;
        }
        console.log(rowStr);
    }
}

function readMatrix(rows, cols) {
    let matrix = [];
    for (let i = 1; i <= rows; i++) {
        let line = readlineSync.question('Enter row ' + i + ': ');
        let row = line.split(' ').map(Number);
        matrix.push(row);
    }
    return matrix;
}

function transposeMatrix(matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;

    let transposed = [];
    for (let j = 0; j < cols; j++) {
        let newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(0);
        }
        transposed.push(newRow);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }

    return transposed;
}

function addMatrices(a, b) {
    let rows = a.length;
    let cols = a[0].length;

    let result = [];
    for (let i = 0; i < rows; i++) {
        let newRow = [];
        for (let j = 0; j < cols; j++) {
            newRow.push(a[i][j] + b[i][j]);
        }
        result.push(newRow);
    }

    return result;
}

function multiplyMatrices(a, b) {
    let rowsA = a.length;
    let colsA = a[0].length;   
    let colsB = b[0].length;

    let result = [];
    for (let i = 0; i < rowsA; i++) {
        let newRow = [];
        for (let j = 0; j < colsB; j++) {
            newRow.push(0);
        }
        result.push(newRow);
    }

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i][j] = sum;
        }
    }

    return result;
}

console.log('===== PART A: Transpose a Matrix =====');
let rowsA = Number(readlineSync.question('Enter number of rows: '));
let colsA = Number(readlineSync.question('Enter number of columns: '));
let matrixA = readMatrix(rowsA, colsA);

console.log('');
console.log('Original Matrix:');
printMatrix(matrixA);

let transposed = transposeMatrix(matrixA);
console.log('');
console.log('Transposed Matrix:');
printMatrix(transposed);

console.log('');
console.log('===== PART B: Add Two Matrices =====');
let rowsB = Number(readlineSync.question('Enter number of rows: '));
let colsB = Number(readlineSync.question('Enter number of columns: '));

console.log('First Matrix:');
let matrixB1 = readMatrix(rowsB, colsB);
console.log('Second Matrix:');
let matrixB2 = readMatrix(rowsB, colsB);

let sumMatrix = addMatrices(matrixB1, matrixB2);
console.log('');
console.log('Sum of the two matrices:');
printMatrix(sumMatrix);

console.log('');
console.log('===== PART C: Multiply Two Matrices =====');
let rowsC1 = Number(readlineSync.question('Matrix A — number of rows: '));
let colsC1 = Number(readlineSync.question('Matrix A — number of columns: '));

console.log('Matrix A:');
let matrixC1 = readMatrix(rowsC1, colsC1);

let rowsC2 = colsC1;
let colsC2 = Number(readlineSync.question('Matrix B — number of columns: '));

console.log('Matrix B:');
let matrixC2 = readMatrix(rowsC2, colsC2);

let product = multiplyMatrices(matrixC1, matrixC2);
console.log('');
console.log('Product A x B:');
printMatrix(product);

