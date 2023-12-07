import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n")

const obj = {
  fiveSame: [],
  fourSame: [],
  fullHouse: [],
  threeSame: [],
  twoPair: [],
  onePair: [],
  highCard: []
}

const pidMap = {}

let sum = 0

for (let line of lines) {
  const [cards, bid] = line.split(" ")
  pidMap[cards] = +bid
  const splittedCards = cards.split("")
  const countedOccurence = {}
  for (const card of splittedCards) {
    if (countedOccurence[card]) {
      countedOccurence[card]++
    } else {
      countedOccurence[card] = 1
    }
  }
  const countedOccurenceArray = Object.values(countedOccurence).sort().reverse()
  if (countedOccurenceArray[0] === 5) {
    obj.fiveSame.push(cards)
  } else if (countedOccurenceArray[0] === 4) {
    obj.fourSame.push(cards)
  } else if (countedOccurenceArray[0] === 3 && countedOccurenceArray[1] === 2) {
    obj.fullHouse.push(cards)
  } else if (countedOccurenceArray[0] === 3) {
    obj.threeSame.push(cards)
  } else if (countedOccurenceArray[0] === 2 && countedOccurenceArray[1] === 2) {
    obj.twoPair.push(cards)
  } else if (countedOccurenceArray[0] === 2) {
    obj.onePair.push(cards)
  } else {
    obj.highCard.push(cards)
  }
}

for (const typeOfHands in obj) {
  obj[typeOfHands].sort((pairA, pairB) => {
    const cardOrder = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
    for (let i = 0; i < 5; i++) {
      const powerOfCardA = cardOrder.findIndex(c => c === pairA[i])
      const powerOfCardB = cardOrder.findIndex(c => c === pairB[i])
      if (powerOfCardA === powerOfCardB) continue
      return powerOfCardA > powerOfCardB ? 1 : -1
    }
  })
}

const orderedHands = [...obj.highCard, ...obj.onePair, ...obj.twoPair, ...obj.threeSame, ...obj.fullHouse, ...obj.fourSame, ...obj.fiveSame]

for (let i = 0; i < orderedHands.length; i++) {
  const rank = i+1
  sum += rank * pidMap[orderedHands[i]]
}

console.log(sum)