let xp = 0;
let gold = 500;
let currentWeapon = 0;
let health = 1000;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    power: 5,
    gold: 10,
    xp: 5,
  },
  {
    name: "Beast",
    level: 8,
    health: 60,
    power: 15,
    gold: 20,
    xp: 15,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    power: 50,
    gold: 100,
    xp: 100,
  },
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon", "Easter Egg"],
    "button functions": [goStore, goCave, fightDragon, easterEgg],
    text: 'You are in the town square. You see a sign that says "store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health for 10 gold",
      "Buy weapon for 30 gold",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight Beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, run],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to store", "Go to cave", "Easter Egg"],
    "button functions": [goTown, goStore, goCave, easterEgg],
    text: "You defeated the monster!",
  },
  {
    name: "lose",
    "button text": ["RESTART", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You died. You lose.",
  },
  {
    name: "win",
    "button text": ["RESTART", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the dragon! You win the game!",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Chosen between 0 and 10. Win is random"
  }
];
// Nếu có inventoryList thì mới cần, còn không có thì bỏ dòng này
// const inventoryList = document.querySelector("#inventoryList")

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = easterEgg;

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
    if (location["button text"].length > 3) {
      button4.style.display = "inline-block";
      button4.innerText = location["button text"][3];
      button4.onclick = location["button functions"][3];
    } else {
      button4.style.display = "none";
    }
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}
function easterEgg() {
  update(locations[7]);
}

function buyHealth() {
  if (gold >= 10) {
    gold = gold - 10;
    health = health + 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You don't have enough gold to buy health.";
  }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You don't have enough gold to buy a weapon.";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); // remove the first weapon from inventory
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "You can't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth; // khởi tạo máu quái
  monsterStats.style.display = "block";
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  }else{
    text.innerText += " You miss.";

  }
  health -= getMonsterAttackValue(monsters[fighting].power);
  monsterHealth -= weapons[currentWeapon].power + Math.floor((Math.random() * xp) / 4);
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += "Your" + inventory.pop() + " broke.";
    currentWeapon--;

}
}

function getMonsterAttackValue(level){
  let hit = (level * 5) - Math.floor((Math.random() * xp));
  console.log(hit);
  return hit;

}

function isMonsterHit(){
  return Math.random() > 0.2 || health < 20;
}


function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[fighting].name + ".";
}

function run() {
  let randoms = Math.floor(Math.random() *2);
  if (randoms === 0) {
    text.innerText = "You successfully ran away.";
  }else{
    text.innerText = "You failed to run away.";
    health -= getMonsterAttackValue(monsters[fighting].level);
    healthText.innerText = health;
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].xp;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart(){
  xp = 0;
  gold = 500;
  currentWeapon = 0;
  health = 1000;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}


function pickTwo(){
  pick(2);
}

function pickEight(){
  pick(8);
}

function pick(guess){
  let numbers = [];
  while(numbers.length < 10){
    numbers.push(Math.floor(Math.random() * 11));
}

  text.innerText = "You picked " + guess + ". The numbers are: " + numbers;
//   for (let i = 0; i < numbers.length; i++){
//     text.innerText += numbers[i] + " ";
// }

  if (numbers.indexOf(guess) !== -1){
    text.innerText += "You win! You get 20 gold.";
    gold += 20;
    goldText.innerText = gold;
  }else{
    text.innerText += "You lose!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0){
      lose();
    }
  }
}