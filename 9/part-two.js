import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\r\n").filter(l => l).map(l => l.split(" ").map(c => +c))

let sum = 0;

function calculateDifferenceSequence(sequence) {
  const arr = []
  for (let i = 0; i < sequence.length-1; i++) {
    arr.push(sequence[i+1]-sequence[i])
  }
  return arr
}

function getExtraNumber(sequence) {
  const subsequences = [sequence]
  while(!subsequences.at(-1).every(n => n === 0)) {
    const difference = calculateDifferenceSequence(subsequences.at(-1))
    subsequences.push(difference)
  }
  for (let i = subsequences.length-1; i > 0; i--) {
    subsequences[i-1].unshift(subsequences[i-1][0] - subsequences[i][0])
  }
  return subsequences[0][0]
}

for (const sequence of lines) {
  sum += getExtraNumber(sequence)
}

console.log(sum)