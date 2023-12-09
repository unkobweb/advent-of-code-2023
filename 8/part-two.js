import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\r\n").filter(l => l)

const instructions = lines.shift().split("")

const map = {}

const currentPlaces = []
const zSteps = {}

for (const path of lines) {
  const [source, destinations] = path.replace(/\(|\)/gm, "").split(" = ")
  const [left, right] = destinations.split(", ")
  map[source] = {L: left, R: right}
  if (source.endsWith("A")) {
    currentPlaces.push(source)
  }
}

console.log("Map created")

for (let i = 0; i < currentPlaces.length; i++) {
  let steps = 0
  let instructionIndex = 0
  let currentPlace = currentPlaces[i]

  zSteps[currentPlace] = []
  console.log(`Check zSteps for ${i+1}/${currentPlaces.length}`)
  for (let j = 0; j < 10000000; j++) {
    steps++
    if (instructionIndex === instructions.length) instructionIndex = 0
    const instruction = instructions[instructionIndex]
    currentPlace = map[currentPlace][instruction]
    if (currentPlace.endsWith("Z")) zSteps[currentPlaces[i]].push(steps)
    instructionIndex++
  }
}

const zPas = {}

console.log("Calculate step")
for (const key in zSteps) {
  const differences = new Set()
  for (let i = 0; i < zSteps[key].length-1; i++) {
    differences.add(zSteps[key][i+1] - zSteps[key][i])
  }
  zPas[key] = Array.from(differences)[0]
}

const allDividers = Object.values(zPas)

// Fonction pour calculer le PGCD
function pgcd(a, b) {
  return b === 0 ? a : pgcd(b, a % b);
}

// Fonction pour calculer le LCM de deux nombres
function lcm(a, b) {
  return Math.abs(a * b) / pgcd(a, b);
}

// Fonction pour calculer le LCM de plusieurs nombres
function lcmMultiple(numbers) {
  if (numbers.length < 2) {
      console.error("Il faut au moins deux nombres pour calculer le LCM.");
      return;
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
  }

  return result;
}

console.log("The answer is : "+lcmMultiple(allDividers))