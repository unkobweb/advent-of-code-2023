import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const table = input.split("\n").map(line => line.replaceAll(/\s/gm,"").trim().split(""));

let sideNumbers = []
let alreadyUsedCoordinates = []

let sum = 0

function retrieveNumber(x, y) {
  if (alreadyUsedCoordinates.includes(`x${x}y${y}`)) return

  alreadyUsedCoordinates.push(`x${x}y${y}`)

  const savedX = x
  const digitOfNumber = [+table[y][x]]

  x--
  while(!isNaN(parseInt(table[y][x]))) {
    alreadyUsedCoordinates.push(`x${x}y${y}`)
    digitOfNumber.unshift(+table[y][x])
    x--
  }
  x = savedX+1
  while(!isNaN(parseInt(table[y][x]))) {
    alreadyUsedCoordinates.push(`x${x}y${y}`)
    digitOfNumber.push(+table[y][x])
    x++
  }

  sideNumbers.push(+digitOfNumber.join(""))
}

function checkArea(x, y) {
  sideNumbers = []
  alreadyUsedCoordinates = []
  try { if (!isNaN(parseInt(table[y-1][x-1]))) retrieveNumber(x-1, y-1) } catch {}
  try { if (!isNaN(parseInt(table[y-1][x]))) retrieveNumber(x, y-1) } catch {}
  try { if (!isNaN(parseInt(table[y-1][x+1]))) retrieveNumber(x+1, y-1) } catch {}
  try { if (!isNaN(parseInt(table[y][x-1]))) retrieveNumber(x-1, y) } catch {}
  try { if (!isNaN(parseInt(table[y][x+1]))) retrieveNumber(x+1, y) } catch {}
  try { if (!isNaN(parseInt(table[y+1][x-1]))) retrieveNumber(x-1, y+1) } catch {}
  try { if (!isNaN(parseInt(table[y+1][x]))) retrieveNumber(x, y+1) } catch {}
  try { if (!isNaN(parseInt(table[y+1][x+1]))) retrieveNumber(x+1, y+1) } catch {}
  if (sideNumbers.length === 2) {
    sum += sideNumbers[0] * sideNumbers[1]
  }
}

for (let y = 0; y < table.length; y++) {
  const line = table[y]
  for (let x = 0; x < line.length; x++) {
    const cell = table[y][x]
    if (cell === "*") {
      checkArea(x, y)
    }
  }
}

console.log(sum)