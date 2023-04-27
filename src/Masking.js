export const applyMaskSuitPair = (suit, suitMask) => {
  // suit: an array of tileCount
  // suitMask, a boolean array with same dimension with suit
  // 1 means targeted tile
  // will be awared of pair
  // will return number of tiles matched and whether pair exists
  let count = 0
  let pairExists = false
  for (let i = 0; i < suitMask.length; i++){
    if (suitMask[i] && suit[i] > 0){
      count++
      if (suit[i] >= 2){
        pairExists = true
      }
    }
  }

  return [count, pairExists]
}


export const applyMaskSuitResidual = (suit, suitMask) => {
  // suit: an array of tileCount
  // suitMask, a 0-1 array with same dimension with suit
  // 1 means targeted tile
  // will be ignorance of pair
  // return number of tiles matched and remaining tiles

  let suit_ = [...suit]
  let count = 0
  for (let i = 0; i < suitMask.length; i++){
    if (suitMask[i] && suit_[i] > 0){
      count++
      suit_[i]--
    }
  }

  return [count, suit_]
}

const kokushiPlain = [true, false, false, false, false, false, false, false, true]
const kokushiHonour = [true, true, true, true, true, true, true]

const knit = [
  [true, false, false, true, false, false, true, false, false],
  [false, true, false, false, true, false, false, true, false],
  [false, false, true, false, false, true, false, false, true]
]

const batDaapPlain = [
  [true, false, false, true, false, false, true, false, false],  // 147
  [true, false, false, true, false, false, false, true, false],  // 148
  [true, false, false, true, false, false, false, false, true],  // 149
  [true, false, false, false, true, false, false, true, false],  // 158
  [true, false, false, false, true, false, false, false, true],  // 159
  [true, false, false, false, false, true, false, false, true],  // 169
  [false, true, false, false, true, false, false, true, false],  // 258
  [false, true, false, false, true, false, false, false, true],  // 259
  [false, true, false, false, false, true, false, false, true],  // 269
  [false, false, true, false, false, true, false, false, true],  // 369
]

export const masks = {
  kokushiPlain,
  kokushiHonour,
  knit,
  batDaapPlain
}