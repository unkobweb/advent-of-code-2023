import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

let sumOfPower = 0

for (const line of input.split("\r\n")) {
  const [gameMetadata, gameContent] = line.split(": ")
  const gameId = +gameMetadata.replace("Game ","")
  const rounds = gameContent.split("; ")
  const colorMemory = {red: 0, green: 0, blue: 0}
  for (const round of rounds) {
    const colorsData = round.split(", ")
    for (const colorData of colorsData) {
      const [amount, color] = colorData.split(" ")
      colorMemory[color] = colorMemory[color] > +amount ? colorMemory[color] : +amount
    }
  }
  const {red, green, blue} = colorMemory
  sumOfPower += (red*blue*green)
}

console.log(sumOfPower)