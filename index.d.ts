export declare type TileCount = 0 | 1 | 2 | 3 | 4
export declare type Hand = TileCount[][]
export declare type TileName = string
export declare type RuleName = 'Menzu' | 'HK' | 'Riichi' | 'ZungJung' | 'MCR' | 'Taiwan' | 'HKTW'
export declare type HandStatus = 'To draw' | 'To play' | undefined

export declare function calShantenRule(ruleName: RuleName): (hand: Hand) => number
export declare function tilesTohand(tilesArr: TileName[]): Hand
export declare function checkHand(hand: Hand, ruleName: RuleName): HandStatus
export declare function calUkeire(hand: Hand, ruleName: RuleName): Object

