//constants

let limit = 50;
let page = 1;

monsterContainer = document.querySelector("#monster-container");
createMonsterForm = document.querySelector(".add-monster-form");
const back = document.querySelector("#back");
const forward = document.querySelector("#forward");
//function calls
getMonsters();
listenToFormSubmit();

//listener
function listenToFormSubmit() {
  // 1. event listener for form submit
  createMonsterForm.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const newMonster = getInfoFromForm(event);
  persistNewMonster(newMonster);
}

function getInfoFromForm(event) {
  const nameInput = event.target.children[1];
  const ageInput = event.target.children[3];
  const descriptionInput = event.target.children[4];

  const name = nameInput.value;
  const age = ageInput.value;
  const description = descriptionInput.value;

  const monsterStructure = {
    name: name,
    age: age,
    description: description,
  };
  return monsterStructure;
}
//fetches
function getMonsters() {
  back.addEventListener("click", goBack);
  forward.addEventListener("click", getMore);
  fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then((res) => res.json())
    .then((monsters) => getMonsterInfo(monsters));

  function getMonsterInfo(monsters) {
    monsters.forEach((monster) => appendSingleMonster(monster));
  }

  function appendSingleMonster(monster) {
    const { name, age, description } = monster;

    let usableHTML = `<div>
     <h2> ${name}</h2>
     <h4>${age}</h4>
     <p>Bio: ${description}</p> ;
     </div>`;
    addMonsterInfo(usableHTML);
  }

  function addMonsterInfo(usableHTML) {
    monsterContainer.innerHTML += usableHTML;
  }
}

function persistNewMonster(newMonster) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMonster),
  };

  fetch("http://localhost:3000/monsters", options)
    .then((response) => response.json())
    .then((monster) => addMonsterInfo(monster));
}

function goBack() {
  if (page === 1) {
    alert("Can't go back.");
  } else {
    container.innerHTML = "";
    --page;
    getMonsters();
  }
}

function getMore() {
  if (container.childElementCount <= 19) {
    alert("No More Monsters to Show!");
  } else {
    container.innerHTML = "";
    ++page;
    getMonsters();
  }
}
// POST http://localhost:3000/monsters
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// data:
// { name: string, age: number, description: string }
//listeners

//handlers

function getMore() {
  if (container.childElementCount <= 19) {
    alert("No More Monsters to Show!");
  } else {
    container.innerHTML = "";
    ++page;
    getMonsters();
  }
}
