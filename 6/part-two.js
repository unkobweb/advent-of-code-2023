/**
 * Quand j'ai fait le advent of code, pour la partie 2, je me suis contenté d'enlever les espaces dans l'input
 * et de relancer mon algo de partie 1, mais pour garder une continuité dans ce github, voici l'algo que j'aurais fait
 * si on avait eu uniquement la partie 2
 */
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\r\n").filter(l => l !== "")

const time = +lines[0].replace("Time:","").replace(/\s/gm,"")
const record = +lines[1].replace("Distance:","").replace(/\s/gm,"")

let beattableWays = 0
for (let i = 0; i < time; i++) {
  let speed = i
  const distanceDone = speed * (time - speed)
  if (distanceDone > record) beattableWays++
}

console.log(beattableWays)