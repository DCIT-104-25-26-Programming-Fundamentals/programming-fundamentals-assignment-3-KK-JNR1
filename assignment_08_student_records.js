// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require("readline-sync");

let students = [];

function calculateAverage(scores) {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((total, score) => total + score, 0);
  return sum / scores.length;
}

function addStudent() {
  const name = readline.question("Student name: ").trim();
  if (name === "") {
    console.log("Error: Student name cannot be empty.");
    return;
  }

  const idInput = readline.question("Student ID: ").trim();
  const id = parseInt(idInput, 10);
  if (isNaN(id)) {
    console.log("Error: Student ID must be a valid number.");
    return;
  }

  const exists = students.some((student) => student.id === id);
  if (exists) {
    console.log(`Error: Student with ID ${id} already exists.`);
    return;
  }

  const numScoresInput = readline.question("How many scores? ").trim();
  const numScores = parseInt(numScoresInput, 10);

  if (isNaN(numScores) || numScores <= 0) {
    console.log("Error: Number of scores must be a positive integer.");
    return;
  }

  const scores = [];
  for (let i = 1; i <= numScores; i++) {
    const scoreInput = readline.question(`Enter score ${i}: `).trim();
    const score = parseFloat(scoreInput);

    if (isNaN(score)) {
      console.log("Error: Invalid score entered. Aborting student registration.");
      return;
    }
    scores.push(score);
  }

  const studentObj = {
    name: name,
    id: id,
    scores: scores,
  };

  students.push(studentObj);
  console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents() {
  if (students.length === 0) {
    console.log("No student records found.");
    return;
  }

  console.log("\n==========================================================================");
  console.log("                           ALL STUDENT RECORDS                           ");
  console.log("==========================================================================");

  students.forEach((student, index) => {
    const avg = calculateAverage(student.scores).toFixed(2);
    console.log(`\n${index + 1}. Name:    ${student.name}`);
    console.log(`   ID:      ${student.id}`);
    console.log(`   Scores:  [${student.scores.join(", ")}]`);
    console.log(`   Average: ${avg}`);
  });
  console.log("==========================================================================");
}

function calculateSpecificAverage() {
  if (students.length === 0) {
    console.log("No student records available.");
    return;
  }

  const idInput = readline.question("Enter student ID: ").trim();
  const id = parseInt(idInput, 10);

  if (isNaN(id)) {
    console.log("Error: Invalid ID format.");
    return;
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    console.log(`Error: Student with ID ${id} not found.`);
  } else {
    const avg = calculateAverage(student.scores).toFixed(2);
    console.log(`${student.name}'s average score: ${avg}`);
  }
}

function printMenu() {
  console.log("\n================================");
  console.log("   STUDENT RECORD SYSTEM MENU   ");
  console.log("================================");
  console.log("1. Add student");
  console.log("2. Display all students");
  console.log("3. Calculate average score");
  console.log("4. Quit");
}

function main() {
  let isRunning = true;

  while (isRunning) {
    printMenu();
    const choice = readline.question("Enter your choice (1-4): ").trim();

    switch (choice) {
      case "1":
        addStudent();
        break;
      case "2":
        displayAllStudents();
        break;
      case "3":
        calculateSpecificAverage();
        break;
      case "4":
        console.log("Goodbye!");
        isRunning = false;
        break;
      default:
        console.log("Invalid choice. Please enter a number between 1 and 4.");
        break;
    }
  }
}
main();
