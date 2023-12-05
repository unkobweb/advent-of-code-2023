import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n").filter(l => l !== "")

const seeds = lines.shift().split(": ")[1].split(" ")
const seedsLocation = []

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
  let number = seed;
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
  seedsLocation.push(number)
}


console.log(Math.min(...seedsLocation))