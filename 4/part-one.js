import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

let total = 0

for (const line of input.split("\n")) {
  const [firstPart, secondPart] = line.split(" | ")
  const winningNumbers = firstPart.split(": ")[1].split(" ").filter(c => c !== "")
  const ourNumbers = secondPart.split(" ").filter(c => c !== "")

  let nbPoints = 0;

  for (const number of ourNumbers) {
    if (winningNumbers.includes(number)) {
      if (nbPoints === 0) {
        nbPoints = 1
      } else {
        nbPoints *= 2
      }
    }
  }

  total += nbPoints
}

console.log(total)