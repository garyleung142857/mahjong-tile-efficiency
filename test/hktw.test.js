import { cal, tilesToHand } from "../index.js"

const tiles1 = [
  '1m', '9m', '1p', '5p', '9p', '1s', '1s', '2s', '2s', '3s', '1z', '2z', '3z', '4z', '5z', '6z', '7z'
]

test('HKTW Sap Samm Jiu', () => {
  const hand1 = tilesToHand(tiles1)
  expect(cal.calShantenSapSaamJiu(hand1)).toBe(1)
})

