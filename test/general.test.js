import { tilesToHand } from '../index.js'

const tiles1 = [
  '1m', '2m', '3m', '6p', '7p', '7p', '7p', '8p', '8p', '5s', '5s', '1z', '1z'
]

test('tiles to hand', () => {
  expect(
    tilesToHand(tiles1)
  ).toStrictEqual([
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 3, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0]
  ])
})

