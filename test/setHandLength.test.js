import { setHandLength, cal } from "../src/CalShanten";
import { RuleSet, tilesToHand } from "../index.js";

test('Set Hand Length', () => {
  const zungyungRule = new RuleSet('ZungJung')
  const newHandLengthFunc = (hand) => {
    let s = 0
    hand.forEach(suit => {
      suit.forEach(tileCount => {
        s += tileCount
      })
    })
    return s + 1
  }

  setHandLength(newHandLengthFunc)

  const tiles1 = [
    '1m', '9m', '1s', '9s', '1p', '9p', '1z', '2z', '3z', '4z', '5z', '3s'
  ]  // 12 tiles

  const hand1 = tilesToHand(tiles1)
  expect(zungyungRule.calShanten(hand1)).toBe(2)

  const tiles2 = [
    '1m', '1m', '9m', '9m', '4s', '5s', '7p', '7p', '8p', '8p', '1z', '1z'
  ]  // 12 tiles

  const hand2 = tilesToHand(tiles2)
  expect(zungyungRule.calShanten(hand2)).toBe(1)
})
