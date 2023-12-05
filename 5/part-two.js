import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n").filter(l => l !== "")

const seeds = []
const seedsNumbers = lines.shift().split(": ")[1].split(" ")
for (let i = 0; i < seedsNumbers.length; i+=2) {
  seeds.push({start: +seedsNumbers[i], count: +seedsNumbers[i+1]})
}

let lowestSeedsLocation = Infinity

const pages = []
let pageIndex = -1

for (const line of lines) {
  if (line.includes("map")) {
    pageIndex++
    pages[pageIndex] = []
  } else {
    const [dest, source, range] = line.split(" ").map(n => +n)
    pages[pageIndex].push({dest, source, range})
  }
}

for (const seed of seeds) {
  console.count(`Seed number of ${seeds.length}`)
  for (let i = 0; i < seed.count; i++) {
    let number = seed.start+i;
    almanacPagesLoop: for (pageIndex = 0; pageIndex < pages.length; pageIndex++) {
      const correspondances = pages[pageIndex]
      for (const corr of correspondances) {
        if (number <= corr.source+corr.range-1 && number >= corr.source) {
          // console.log(`${number} between ${corr.source} and ${corr.source+corr.range-1}`)
          const delta = number - corr.source
          number = corr.dest + delta
          continue almanacPagesLoop;
        }
      }
      // console.log("Number not found keep same for next page")
    }
    if (number < lowestSeedsLocation) {
      lowestSeedsLocation = number
    }
  }
}

console.log(lowestSeedsLocation)