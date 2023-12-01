import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

let sum = 0

for (const line of input.split("\n")) {
  const numbers = line.split("").filter(char => parseInt(char))
  if (numbers.length === 1) {
    const number = numbers[0]
    sum += +`${number}${number}`
  } else {
    sum += +`${numbers.shift()}${numbers.pop()}`
  }
}

console.log(sum)