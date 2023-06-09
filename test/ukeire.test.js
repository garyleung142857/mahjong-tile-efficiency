import { RuleSet, tilesToHand } from "../index.js";

test('ukeire for 3n+1 hand', () => {
  const riichiRule = new RuleSet('Riichi')
  const tiles1 = [
    '1m', '2m', '3m', '6p', '7p', '7p', '7p', '8p', '8p', '5s', '5s', '1z', '1z'
  ]
  const hand1 = tilesToHand(tiles1)
  expect(riichiRule.calUkeire(hand1, 'Riichi')).toStrictEqual({
    shanten: 1,
    ukeire: { '6p': 3, '7p': 1, '8p': 2, '9p': 4, '5s': 2, '1z': 2 },
    totalUkeire: 14
  })
  
})

test('ukeire for 3n+2 hand', () => {
  const hktwRule = new RuleSet('HKTW')
  const tiles2 = [
    '1m', '5m', '6m', '7m', '2p', '5p', '6p', '9p', '1s', '5s', '6s', '8s', '1z', '2z', '3z', '4z', '4z'
  ]

  const hand2 = tilesToHand(tiles2)
  expect(hktwRule.calUkeire(hand2, 'HKTW')).toStrictEqual({
    shanten: 3,
    normalDiscard: {
      '5m': { '4m': 4, '9m': 4, '5z': 4, '6z': 4, '7z': 4 },
      '6m': { '4m': 4, '8m': 4, '9m': 4, '5z': 4, '6z': 4, '7z': 4 },
      '7m': { '8m': 4, '9m': 4, '5z': 4, '6z': 4, '7z': 4 },
      '5p': { '4m': 4, '8m': 4, '9m': 4, '5z': 4, '6z': 4, '7z': 4 },
      '6p': { '4m': 4, '8m': 4, '9m': 4, '5z': 4, '6z': 4, '7z': 4 },
      '6s': { '4m': 4, '8m': 4, '9m': 4, '5z': 4, '6z': 4, '7z': 4 }
    },
    recedingDiscard: {
      '1m': {
        '1m': 4,
        '2m': 4,
        '3m': 4,
        '4m': 4,
        '8m': 4,
        '9m': 4,
        '5z': 4,
        '6z': 4,
        '7z': 4
      },
      '2p': {
        '4m': 4,
        '8m': 4,
        '9m': 4,
        '1p': 4,
        '2p': 4,
        '3p': 4,
        '5z': 4,
        '6z': 4,
        '7z': 4
      },
      '9p': {
        '4m': 4,
        '8m': 4,
        '9m': 4,
        '8p': 4,
        '9p': 4,
        '5z': 4,
        '6z': 4,
        '7z': 4
      },
      '1s': {
        '4m': 4,
        '8m': 4,
        '9m': 4,
        '1s': 4,
        '2s': 4,
        '5z': 4,
        '6z': 4,
        '7z': 4
      },
      '5s': {
        '4m': 4,
        '8m': 4,
        '9m': 4,
        '4s': 4,
        '5s': 4,
        '9s': 4,
        '5z': 4,
        '6z': 4,
        '7z': 4
      },
      '8s': {
        '4m': 4,
        '8m': 4,
        '9m': 4,
        '8s': 4,
        '9s': 4,
        '5z': 4,
        '6z': 4,
        '7z': 4
      },
      '1z': { '4m': 4, '8m': 4, '9m': 4, '1z': 4, '5z': 4, '6z': 4, '7z': 4 },
      '2z': { '4m': 4, '8m': 4, '9m': 4, '2z': 4, '5z': 4, '6z': 4, '7z': 4 },
      '3z': { '4m': 4, '8m': 4, '9m': 4, '3z': 4, '5z': 4, '6z': 4, '7z': 4 },
      '4z': {
        '1m': 3,
        '4m': 4,
        '5m': 3,
        '6m': 3,
        '7m': 3,
        '8m': 4,
        '9m': 4,
        '2p': 3,
        '5p': 3,
        '6p': 3,
        '9p': 3,
        '1s': 3,
        '5s': 3,
        '8s': 3,
        '1z': 3,
        '2z': 3,
        '3z': 3,
        '4z': 3,
        '5z': 4,
        '6z': 4,
        '7z': 4
      }
    }
  })
})