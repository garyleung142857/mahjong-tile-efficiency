export declare type TileCount = 0 | 1 | 2 | 3 | 4
export declare type Hand = TileCount[][]
export declare type TileName = string
export declare type Tiles = TileName[]
export declare type RuleName = 'Menzu' | 'HK' | 'Riichi' | 'ZungJung' | 'MCR' | 'Taiwan' | 'HKTW'

export declare function tilesTohand(tilesArr: Tiles): Hand
export declare class RuleSet {
  constructor (ruleName: RuleName)
  calShanten(hand: Hand): number
  calUkeire(hand: Hand): Object
}
