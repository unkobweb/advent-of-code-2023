import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const memory = []

let totalCards = 0

function getRewards(cardNumber) {
  totalCards++

  for (let i = cardNumber; i < cardNumber+memory[cardNumber]; i++) {
    getRewards(i+1)
  }
}

// write memory
for (const line of input.split("\n")) {
  const [firstPart, secondPart] = line.split(" | ")
  const splittedFirstPart = firstPart.split(": ")

  const cardNumber = +splittedFirstPart[0].split(" ").filter(c => c !== "")[1]

  const winningNumbers = splittedFirstPart[1].split(" ").filter(c => c !== "")
  const ourNumbers = secondPart.split(" ").filter(c => c !== "")

  let nbMatch = 0;

  for (const number of ourNumbers) {
    if (winningNumbers.includes(number)) {
      nbMatch += 1
    }
  }

  memory[cardNumber] = nbMatch
}

for (const line of input.split("\n")) {
  const [firstPart,] = line.split(" | ")
  const splittedFirstPart = firstPart.split(": ")

  const cardNumber = +splittedFirstPart[0].split(" ").filter(c => c !== "")[1]

  getRewards(cardNumber)
}

console.log(totalCards)