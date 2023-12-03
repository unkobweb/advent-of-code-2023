import fs from "fs";

const numberList = "0123456789".split("")

const input = fs.readFileSync("./input.txt", "utf-8");

const table = input.split("\n").map(line => line.replaceAll(/\s/gm,"").trim().split(""));

const alreadyUsedCoordinates = []

let sum = 0

function retrieveNumber(x, y) {
  if (alreadyUsedCoordinates.includes(`x${x}y${y}`)) return

  alreadyUsedCoordinates.push(`x${x}y${y}`)

  const savedX = x
  const digitOfNumber = [+table[y][x]]
  
  x--
  while(!alreadyUsedCoordinates.includes(`x${x}y${y}`) && !isNaN(parseInt(table[y][x]))) {
    alreadyUsedCoordinates.push(`x${x}y${y}`)
    digitOfNumber.unshift(+table[y][x])
    x--
  }
  x = savedX+1
  while(!alreadyUsedCoordinates.includes(`x${x}y${y}`) && !isNaN(parseInt(table[y][x]))) {
    alreadyUsedCoordinates.push(`x${x}y${y}`)
    digitOfNumber.push(+table[y][x])
    x++
  }

  sum += +digitOfNumber.join("")
}

function checkArea(x, y) {
  try { if (!isNaN(parseInt(table[y-1][x-1]))) retrieveNumber(x-1, y-1) } catch {}
  try { if (!isNaN(parseInt(table[y-1][x]))) retrieveNumber(x, y-1) } catch {}
  try { if (!isNaN(parseInt(table[y-1][x+1]))) retrieveNumber(x+1, y-1) } catch {}
  try { if (!isNaN(parseInt(table[y][x-1]))) retrieveNumber(x-1, y) } catch {}
  try { if (!isNaN(parseInt(table[y][x+1]))) retrieveNumber(x+1, y) } catch {}
  try { if (!isNaN(parseInt(table[y+1][x-1]))) retrieveNumber(x-1, y+1) } catch {}
  try { if (!isNaN(parseInt(table[y+1][x]))) retrieveNumber(x, y+1) } catch {}
  try { if (!isNaN(parseInt(table[y+1][x+1]))) retrieveNumber(x+1, y+1) } catch {}
}

for (let y = 0; y < table.length; y++) {
  const line = table[y]
  for (let x = 0; x < line.length; x++) {
    const cell = table[y][x]
    if (!(numberList.includes(cell) || cell === "." || cell === "\n")) {
      checkArea(x, y)
    }
  }
}

console.log(sum)