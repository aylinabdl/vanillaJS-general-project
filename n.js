const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const scoreInput = document.getElementById("score");
const saveButon = document.querySelector(".sub-btn");
const displayData = document.querySelector(".data-div");

displayData.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-icon")) {
    const dataCard = e.target.closest(".data-card");
    if (dataCard) {
      displayData.removeChild(dataCard);
    }
  }
});
scoreInput.addEventListener("input", function (e) {
  const inputValue = e.target.value;
  e.target.value = inputValue.replace(/\D/g, "");
});

saveButon.addEventListener("click", function addData(e) {
  e.preventDefault();
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const score = scoreInput.value;

  if (firstName === "" || lastName === "" || score === "") {
    alert("Please fill in all the fields.");
  } else {
    const newDataCard = document.createElement("div");
    newDataCard.classList.add("data-card");
    newDataCard.innerHTML = `
    <h3>Name: ${firstName}</h3>
    <h3>Last Name: ${lastName}</h3>
    <h3>Score: ${score}</h3>
    <div class="controls">
            <button class="delete-icon">
              <i class="material-icons">delete</i>
            </button>
            <button class="edit-icon">
              <i class="material-icons">edit</i>
            </button>
            </div>
    `;
    displayData.appendChild(newDataCard);
    firstNameInput.value = "";
    lastNameInput.value = "";
    scoreInput.value = "";
  }
});
