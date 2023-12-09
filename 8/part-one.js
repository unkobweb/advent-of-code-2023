import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\r\n").filter(l => l)

const instructions = lines.shift().split("")

const map = {}

let currentPlace = "AAA"

for (const path of lines) {
  const [source, destinations] = path.replace(/\(|\)/gm, "").split(" = ")
  const [left, right] = destinations.split(", ")
  map[source] = {L: left, R: right}
}

let steps = 0
let instructionIndex = 0

while(currentPlace !== "ZZZ") {
  if (instructionIndex === instructions.length) instructionIndex = 0
  const instruction = instructions[instructionIndex]
  currentPlace = map[currentPlace][instruction]
  instructionIndex++
  steps++
}

console.log(steps)