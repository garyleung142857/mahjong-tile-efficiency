import { RuleSet, tilesToHand } from './index.js'
import { readFileSync } from 'fs'

// Parse the menzu test cases into hands
const testContent = readFileSync(new URL('./test/menzu.test.js', import.meta.url), 'utf8')
const arrMatch = testContent.match(/const arr = (\[[\s\S]*?\])\n\nconst cases/m)
const arr = eval(arrMatch[1])

const hands = arr.map(v => {
  const hand = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
  for (const vv of v.slice(0, -1)) {
    hand[Math.floor(vv / 9)][vv % 9]++
  }
  return hand
})

// Prewarm the module-level caches by running once
const menzuRule = new RuleSet('Menzu')
const riichiRule = new RuleSet('Riichi')
const mcrRule = new RuleSet('MCR')
const hktwRule = new RuleSet('HKTW')

for (const hand of hands) {
  menzuRule.calShanten(hand)
}

// Benchmark calShanten (Menzu)
const ITER = 50
console.log(`Running ${ITER} iterations over ${hands.length} hands...\n`)

for (const [name, rule] of [['Menzu', menzuRule], ['Riichi', riichiRule], ['MCR', mcrRule], ['HKTW', hktwRule]]) {
  console.time(`calShanten ${name} (${ITER}x)`)
  for (let iter = 0; iter < ITER; iter++) {
    for (const hand of hands) {
      rule.calShanten(hand)
    }
  }
  console.timeEnd(`calShanten ${name} (${ITER}x)`)
}

// Benchmark ukeire on a subset (10 hands) since it's expensive
console.log('')
const ukeireHands = hands.slice(0, 10)
// Need 3n+1 hands for ukeire1
const ukeire1Hands = ukeireHands.filter(h => {
  const len = h.reduce((a, b) => a + b.reduce((c, d) => c + d, 0), 0)
  return len % 3 === 1
})
// Adjust hands to 3n+1 by adding a tile if needed
while (ukeire1Hands.length < 5) {
  const h = [[...hands[ukeire1Hands.length][0]], [...hands[ukeire1Hands.length][1]], 
             [...hands[ukeire1Hands.length][2]], [...hands[ukeire1Hands.length][3]]]
  const len = h.reduce((a, b) => a + b.reduce((c, d) => c + d, 0), 0)
  if (len % 3 === 2) {
    // Remove one tile to make 3n+1
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < h[i].length; j++) {
        if (h[i][j] > 0) { h[i][j]--; break }
      }
      if (h[i].some(x => x > 0)) break
    }
  }
  ukeire1Hands.push(h)
}

console.time(`calUkeire Riichi ${ukeire1Hands.length} hands`)
for (const hand of ukeire1Hands) {
  riichiRule.calUkeire(hand)
}
console.timeEnd(`calUkeire Riichi ${ukeire1Hands.length} hands`)

console.log('\nDone.')
