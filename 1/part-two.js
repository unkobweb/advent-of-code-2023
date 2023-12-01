import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

let sum = 0

const spelledDigitMap = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
}

function lettersToDigits(line) {
  const numbers = []
  for (let i = 0; i < line.length; i++) {
    // si la lettre est comme le début d'un nombre
    if ("otfsen".split("").includes(line[i])){
      for (const word in spelledDigitMap) {
        if (line.slice(i,i+word.length) === word) {
          numbers.push(spelledDigitMap[word])
        }
      }
    } else if ("0123456789".split("").includes(line[i])) {
      numbers.push(+line[i])
    }
  }
  return numbers
}

for (let line of input.split("\n")) {
  const numbers = lettersToDigits(line)
  if (numbers.length === 1) {
    const number = numbers[0]
    sum += +`${number}${number}`
  } else {
    sum += +`${numbers.shift()}${numbers.pop()}`
  }
}

console.log(sum)