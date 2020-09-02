// Onload functions
fetchAndRenderMonsters(50, 1);
initMouseUpEvent();
initSubmitEvent();

// Event handling functions
function initMouseUpEvent() {
  const backButton = document.getElementById("back");
  const forwardButton = document.getElementById("forward");

  backButton.addEventListener("mouseup", backButtonClick);
  forwardButton.addEventListener("mouseup", forwardButtonClick);
}

function initSubmitEvent() {
  const createMonsterForm = document.getElementById("create-monster-form");

  createMonsterForm.addEventListener("submit", createMonsterFormSubmit);
}

function forwardButtonClick(event) {
  const monsterContainer = document.getElementById("monster-container");
  const backButton = document.getElementById("back");
  const pageNumber = +event.target.dataset.pageNumber;

  monsterContainer.innerHTML = "";

  fetchAndRenderMonsters(50, pageNumber + 1);

  revealElement(backButton);
}

function backButtonClick(event) {
  const monsterContainer = document.getElementById("monster-container");
  const pageNumber = +event.target.dataset.pageNumber;

  monsterContainer.innerHTML = "";

  fetchAndRenderMonsters(50, pageNumber - 1);

  if (pageNumber - 1 === 1) {
    hideElement(event.target);
  }
}

function createMonsterFormSubmit(event) {
  event.preventDefault();

  const monsterForm = event.target;

  const monster = {
    name: monsterForm.name.value,
    description: monsterForm.description.value,
  };

  monsterForm.name.value = "";
  monsterForm.description.value = "";

  postMonster(monster);
}

// Render and display functions
function renderMonsters(monsters) {
  const monsterContainer = document.getElementById("monster-container");

  for (const monster of monsters) {
    const monsterDiv = document.createElement("div");
    monsterDiv.classList.add("monster");
    monsterDiv.innerHTML = `
      <h4>${monster.id}. ${monster.name}</h4>
      <p><em>${monster.age} years old</em></p>
      <p>${monster.description}</p>
    `;

    monsterContainer.appendChild(monsterDiv);
  }
}

function setPageNum(page) {
  const backButton = document.getElementById("back");
  const forwardButton = document.getElementById("forward");

  backButton.dataset.pageNumber = page;
  forwardButton.dataset.pageNumber = page;
}

function hideElement(element) {
  element.classList.add("hidden");
}

function revealElement(element) {
  element.classList.remove("hidden");
}

// API call functions
function fetchAndRenderMonsters(limit, page) {
  fetchMonsters(limit, page).then(renderMonsters);
  setPageNum(page);
}

function fetchMonsters(limit, page) {
  return fetch(
    `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`
  ).then((resp) => resp.json());
}

function postMonster(monster) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(monster),
  };

  fetch("http://localhost:3000/monsters/", configObj)
    .then((resp) => resp.json())
    .catch(console.log);
}
