# Mahjong Tile Efficiency

- Calculate shanten number of mahjong hands.
- Support multiple rulesets (Menzu, Hong Kong Old Style, Riichi, ZungJung, MCR, Taiwan, Hong Kong Taiwan Style)
- Calculate ukeire (tile acceptace)

## API

### TilesToHand

Convert a hand of `tiles` format to `hand` format

```javascript
const tiles = [
  '1m', '2m', '3m', '6p', '7p', '7p', '7p', '8p', '8p', '5s', '5s', '1z', '1z'
]
const hand = tilesToHand(tiles)
console.log(hand)
// [
//   [1, 1, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 3, 2, 0],
//   [0, 0, 0, 0, 2, 0, 0, 0, 0],
//   [2, 0, 0, 0, 0, 0, 0]
// ]
```

### RuleSet

A `RuleSet` is a class. An instance of `RuleSet` has two functions: `calShanten` and `calUkeire`. Both functions take in a `hand` as param.

```javascript
import { tilesToHand, RuleSet } from 'mahjong-tile-efficiency'
const tiles = [
  '1m', '2m', '3m', '6p', '7p', '7p', '7p', '8p', '8p', '5s', '5s', '1z', '1z'
]
const hand = tilesToHand(tiles)

const riichiRule = new RuleSet('Riichi')  // 'Menzu' | 'HK' | 'Riichi' | 'ZungJung' | 'MCR' | 'Taiwan' | 'HKTW'
const shantenResult = riichiRule.calShanten(hand)
const ukeireResult = riichiRule.calUkeire(hand)

console.log(shantenResult)
console.log(ukeireResult)

// 1
// {
//   shanten: 1,
//   ukeire: { '6p': 3, '7p': 1, '8p': 2, '9p': 4, '5s': 2, '1z': 2 },
//   totalUkeire: 14
// }
```

Note: if is a karaten (empty tenpai, waiting for the "fifth tile"), the function still count this as tenpai (returns `0`).

`calShanten` function works on either (3n + 1) or (3n + 2) tiles.

`calUkeire` function also works on either (3n + 1) or (3n + 2) tiles, but behavior are different
- With `3n + 1` tiles, the status is "to draw". `calUkeire().ukeire` tells what next drawn tiles can advance the shanten number, and the number of such tiles that are unseen.
- With `3n + 2` tiles, the status is "to discard". `calUkeire().normalDiscard` tells what discard can keep the shanten number, while `calUkeire().recedingDiscard` tells what discard will make shaten number increases (usually inferior play).

```javascript
import { tilesToHand, RuleSet } from 'mahjong-tile-efficiency'
const tiles = [
  '1m', '1m', '1m', '6p', '7p', '7p', '1s', '1s', '2s', '5s', '5s', '1z', '1z', '1z'
]
const hand = tilesToHand(tiles)

const riichiRule = new RuleSet('Riichi')
const ukeireResult = riichiRule.calUkeire(hand)

console.log(ukeireResult)
// {
//   shanten: 1,
//   normalDiscard: {
//     '1m': { '6p': 3, '2s': 3 },
//     '6p': { '7p': 2, '1s': 2, '3s': 4, '5s': 2 },
//     '7p': { '5p': 4, '8p': 4, '1s': 2, '3s': 4, '5s': 2 },
//     '1s': { '5p': 4, '7p': 2, '8p': 4, '3s': 4, '5s': 2 },
//     '2s': { '5p': 4, '7p': 2, '8p': 4, '1s': 2, '5s': 2 },
//     '1z': { '6p': 3, '2s': 3 }
//   },
//   recedingDiscard: {
//     '5s': {
//       '4p': 4,
//       '5p': 4,
//       '6p': 3,
//       '7p': 2,
//       '8p': 4,
//       '9p': 4,
//       '1s': 2,
//       '2s': 3,
//       '3s': 4,
//       '4s': 4,
//       '5s': 3,
//       '6s': 4,
//       '7s': 4
//     }
//   }

```

### Calculate shanten based on final shape
Each mahjong rule consists of different winning pattern.
 - calShantenMenzu: 面子手 standard hand
 - calShantenChiitoi: 七對子 7 pairs (disallow identical pairs)
 - calShantenSevenPairs: 七對 7 pairs (allow identical pairs)
 - calShantenKokushi: 十三么九 / 十三么 / 國士無雙 13 orphans.
 - calShantenHonourAndKnittedTiles: 全不靠 (see MCR rules)
 - calShantenKnittedStraight: 組合龍 (see MCR rules)
 - calShantenLikgu: 嚦咕嚦咕 (see HKTW rules)
 - calShantenBatDaap: 十六不搭 (see HKTW rules)
 - calShantenSapSaamJiu: 十三么 (specifically for HKTW rules)

You can calculate the shanten specifically for a winning pattern. For example:

```javascript
import { cal, tilesToHand } from 'mahjong-tile-efficiency'


const tiles = [
  '1m', '4m', '9m', '5p', '8p', '8p', '4s', '6s', '9s', '1z', '2z', '3z', '4z', '5z'
]

const hand = tilesToHand(tiles)
console.log(cal.calShantenHonourAndKnittedTiles(hand))
// 2
```

## Terminologies

### TileName
There are 34 valid tile names, which are `1m` to `9m`, `1p` to `9p`, `1s` to `9s`, and `1z` to `9z`.
`m` `p` `s` corresponds to "Man", "Pin", and "Sou" plain suits (萬筒索). `z` represents honour tiles (東南西北白發中).

The program does not support `0m` `0p` `0s` for Aka-dora as in Riichi Mahjong.

### Tiles and Hand
Both `Tiles` and `Hand` are representations of a player's hand.
`Tiles` is an array of tiles. `Hand` is an array of arrays of tile count, in which each subarray represents a suit.

The following `tiles` and `hand` represents the same player's hand.

```javascript
const tiles = [
  '1m', '2m', '3m', '6p', '7p', '7p', '7p', '8p', '8p', '5s', '5s', '1z', '1z'
]

const hand = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],  // man
  [0, 0, 0, 0, 0, 1, 3, 2, 0],  // pin
  [0, 0, 0, 0, 2, 0, 0, 0, 0],  // sou
  [2, 0, 0, 0, 0, 0, 0]  // zi
]
```

### RuleName

The program supports multiple rules. Use the following literals for the rules:
- `Menzu`: Standard shapes only
- `HK`: Hong Kong Old Style
- `Riichi`: Japanese mahjong
- `ZungJung`: Zung Jung Rules (Similar to Riichi, except identical pairs are allowed for 7 pairs)
- `MCR`: Chinese MCR rule
- `Taiwan`: Taiwanese Rule (like menzu, but maximum 17 tiles)
- `HKTW`: Taiwan Mahjong Hong Kong style (with 嚦咕嚦咕、十六不搭、十三么)
