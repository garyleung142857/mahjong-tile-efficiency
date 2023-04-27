import { calShantenRule } from './CalShanten.js'
import { tileNames, checkHand } from './Helper.js'

const ukeire1 = (hand, calRule) => {
  // for 3n + 1 hands
  let ukeire = {}
  let totalUkeire = 0
  const originalShanten = calRule(hand)  // at least 0, since not completed

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < hand[i].length; j++){
      const remainingCount = 4 - hand[i][j]  // 4: number of copies in a standard mj set
      if (remainingCount > 0){
        hand[i][j]++
        const newShanten = calRule(hand)
        hand[i][j]--
        if (newShanten < originalShanten){
          ukeire[tileNames[i][j]] = remainingCount
          totalUkeire += remainingCount
        }
      }
    }
  }
  return {
    shanten: originalShanten,
    ukeire,
    totalUkeire
  }
}

const ukeire2 = (hand, calRule) => {
  // for 3n + 2 hands
  // consider every tile, even if shanten increases
  const originalShanten = calRule(hand)
  let normalDiscard = {}
  let recedingDiscard = {}

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < hand[i].length; j++){
      if(hand[i][j] > 0){
        hand[i][j]--
        const newUkeire = ukeire1(hand, calRule)
        const tileName = tileNames[i][j]
        if (newUkeire.shanten > originalShanten) {
          recedingDiscard[tileName] = newUkeire.ukeire
        } else {
          normalDiscard[tileName] = newUkeire.ukeire
        }
        hand[i][j]++
      }
    }
  }
  return {
    shanten: originalShanten,
    normalDiscard,
    recedingDiscard
  }
}

/**
 * Calculate the ukeire of the hand, depending on the state of the hand
 * @param {Hand} hand 
 * @param {RuleName} ruleName 
 * @returns 
 */
export const calUkeireRule = (ruleName) => {
  return (hand) => {
    let state = null
    try {
      state = checkHand(hand, ruleName)
    } catch (e) {
      console.error(e)
    }
  
    const rule = calShantenRule(ruleName)
    if (state === 'To draw'){
      return ukeire1(hand, rule)
    } else {
      return ukeire2(hand, rule)
    }
  }
}