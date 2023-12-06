import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\r\n").filter(l => l !== "")

const times = lines[0].replace("Time:","").split(" ").filter(c => c).map(c => +c)
const distances = lines[1].replace("Distance:","").split(" ").filter(c => c).map(c => +c)

let res = 0

for (let race = 0; race < times.length; race++) {
  const record = distances[race]
  let beattableWays = 0
  for (let i = 0; i < times[race]; i++) {
    let speed = i
    const distanceDone = speed * (times[race] - speed)
    if (distanceDone > record) beattableWays++
  }
  if (res === 0) {
    res = beattableWays
  } else {
    res *= beattableWays
  }
}

console.log(res)