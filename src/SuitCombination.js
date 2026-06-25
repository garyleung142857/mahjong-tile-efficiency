// Calculate how many groups can be extracted in a suit
// For menzu hands only
// output: [maxGroups, maxTaatsus, maxTaatsusWithPair]

let suit = new Array(9)  // 0th position means tile 1
let residuals  // array of suit combinations with maximum number of groups removed

let isHonour
let groups  // current counter
let taatsus  // current counter
let pairs // current counter

let maxGroups  // running max
let maxTaatsus  // running max
let maxTaatsusWithPair  // running max

let suitLenCache  // ponytail: avoid reduce per recursive call
let suitMap = new Map()

export const suitToStr = (suit, isHonour) => {
  let s = ''
  if (isHonour){
    // Honours start with 0, then number of singletons, pairs, sets, and quads
    s = '0'
    const count = [0, 0, 0, 0]
    suit.forEach(tileCount => {
      if (tileCount > 0){
        count[tileCount - 1]++
      }
    })
    count.forEach(c => {
      s += c.toString()
    })
  } else {
    // hash represent counts of tiles
    // start from the lowest existing tiles
    // ends with highest existing tiles
    // eg. 245667 will map to 1 1121
    s = suit.join('').replace('0', ' ').trim() // dirty
  }
  return s
}

export const calOptimalSuitCombination = (suit_, isHonour_ = false) => {
  
  const suitStr = suitToStr(suit_, isHonour_)

  var record = suitMap.get(suitStr)
  if(record) return record

  suit = suit_
  residuals = new Array()
  groups = 0
  taatsus = 0
  pairs = 0
  isHonour = isHonour_
  maxGroups = 0
  maxTaatsus = 0
  maxTaatsusWithPair = 0

  suitLenCache = suit.reduce((a, b) => a + b, 0)

  removeGroups()

  for (let residual of residuals){
    taatsus = 0
    pairs = 0
    suit = residual
    suitLenCache = residual.reduce((a, b) => a + b, 0)
    removeTaatsus()
    if(suitLen() <= 1 && pairs > 0){
      break
    }
  }

  const res = [maxGroups, maxTaatsus, maxTaatsusWithPair]
  suitMap.set(suitStr, res)
  return res
}

const removeGroups = (i = 0) => {

  // skip to index with existing tile
  let pos = i
  for(; pos < suit.length && suit[pos] == 0; pos++){
    //empty
  }

  // ponytail: pruning bound - can't beat current best
  if (groups + Math.floor(suitLenCache / 3) < maxGroups) return

  if(pos >= suit.length){
    if(groups > maxGroups){
      maxGroups = groups
      residuals = [[...suit]]
    } else if(groups == maxGroups){
      residuals.push([...suit])
    }
    return
  }

  // triplet
  if(suit[pos] >= 3){
    groups++
    suit[pos] -= 3
    suitLenCache -= 3
    removeGroups(pos)
    suitLenCache += 3
    suit[pos] += 3
    groups--
  }

  // run
  if(!isHonour && suit[pos + 1] > 0 && suit[pos + 2] > 0){
    groups++
    suit[pos]--; suit[pos + 1]--; suit[pos + 2]--
    suitLenCache -= 3
    removeGroups(pos)
    suitLenCache += 3
    suit[pos]++; suit[pos + 1]++; suit[pos + 2]++
    groups--
  }

  // skip to next position
  removeGroups(pos + 1)
}

const removeTaatsus = (i = 0) => {

  let pos = i
  for(; pos < suit.length && suit[pos] == 0; pos++){
    //empty
  }

  // ponytail: pruning bounds for taatsus
  const maxTaatsuPossible = taatsus + Math.floor(suitLenCache / 2)
  if (maxTaatsuPossible < maxTaatsus && maxTaatsuPossible < maxTaatsusWithPair) return

  if(pos >= suit.length){
    if (taatsus > maxTaatsus){
      maxTaatsus = taatsus
    }
    if (pairs > 0 && taatsus > maxTaatsusWithPair){
      maxTaatsusWithPair = taatsus
    }
    return
  }

  // Pair
  if(suit[pos] >= 2){
    taatsus++; pairs++
    suit[pos] -= 2
    suitLenCache -= 2
    removeTaatsus(pos)
    suitLenCache += 2
    suit[pos] += 2
    taatsus--; pairs--
  }

  // protorun
  if(!isHonour){
    if(suit[pos + 1] > 0){
      taatsus++
      suit[pos]--; suit[pos + 1]--
      suitLenCache -= 2
      removeTaatsus(pos)
      suitLenCache += 2
      suit[pos]++; suit[pos + 1]++
      taatsus--
    }

    if(suit[pos + 2] > 0){
      taatsus++
      suit[pos]--; suit[pos + 2]--
      suitLenCache -= 2
      removeTaatsus(pos)
      suitLenCache += 2
      suit[pos]++; suit[pos + 2]++
      taatsus--
    }
  }

  removeTaatsus(pos + 1)
}

const suitLen = () => {
  return suit.reduce((a, b) => a + b, 0)
}