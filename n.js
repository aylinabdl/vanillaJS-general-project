const studentForm = document.querySelector("form");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const scoreInput = document.querySelector("#score");
const emailInput = document.querySelector("#emailInput");
const saveButton = document.querySelector(".sub-btn");
const displayData = document.querySelector(".data-div");

let isEditMode = false;
let studentList = [];

studentForm.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  if (inputIsEmpty()) {
    alert("please fill in all the fields");
    return;
  }
  const student = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    score: scoreInput.value,
  };

  if (isEditMode) {
    const editedStudent = studentList.find((s) => s.email === emailInput.value);
    if (editedStudent) {
      // Update student's data
      editedStudent.firstName = student.firstName;
      editedStudent.lastName = student.lastName;
      editedStudent.score = student.score;
      // Reset edit mode
      isEditMode = false;
    }
  } else {
    studentList.push(student);
  }

  studentForm.reset();
  showStudent();
}

function inputIsEmpty() {
  if (isEditMode) {
    saveButton.value = "Edit";
  }
  const isEmptyInputs =
    firstNameInput.value === "" ||
    lastNameInput.value === "" ||
    scoreInput.value === "" ||
    emailInput.value === "";
  const scoreIsNumber = isNaN(+scoreInput.value);
  const scoreLimit = !(+scoreInput.value <= 20) || !(+scoreInput.value >= 0);
  return isEmptyInputs || scoreIsNumber || scoreLimit;
}

function deleteStudent(studentmail) {
  studentList = studentList.filter((student) => student.email !== studentmail);
  const student = studentList.find((student) => student.email === studentmail);
  showStudent();
}

function editStudent(studentEmail) {
  // Find the student to edit
  const editedStudent = studentList.find((s) => s.email === studentEmail);
  if (editedStudent) {
    // Set edit mode and populate input fields with the student's data
    isEditMode = true;
    firstNameInput.value = editedStudent.firstName;
    lastNameInput.value = editedStudent.lastName;
    scoreInput.value = editedStudent.score;
    emailInput.value = editedStudent.email;
  }
}

function showStudent() {
  displayData.innerHTML = "";
  for (const student of studentList) {
    const cardTemplate = `
    <div class="data-card">
        
             <h3>Name: ${student.firstName}</h3>
      <h3>Last Name: ${student.lastName}</h3>
      <h3>Email: ${student.email}</h3>
      <h3>Score: ${student.score}</h3>
      <div class="controls">
        <button class="delete-icon" onclick="deleteStudent('${student.email}')">
          <i class="material-icons">delete</i>
        </button>
            <button class="edit-icon" onclick="editStudent('${student.email}')">
          <i class="material-icons">edit</i>
        </button>
            </div>
    </div>
        `;
    displayData.insertAdjacentHTML("beforeend", cardTemplate);
  }
}
