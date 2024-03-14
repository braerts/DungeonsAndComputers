const diceMenu = document.getElementById("dice-menu");

function toggleDiceMenu() {
    diceMenu.style.display = (diceMenu.style.display === "block") ? "none" : "block";
}

function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    chatOutput.innerHTML += `<p>Diceroll: ${result}</p>`;
}