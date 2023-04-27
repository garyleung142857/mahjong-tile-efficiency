import { calShantenRule, cal } from './src/CalShanten.js'
import { tilesToHand, checkHand } from './src/Helper.js'
import { calUkeireRule } from './src/Ukerie.js'

class RuleSet {
  constructor(ruleName) {
    this.calShanten = calShantenRule(ruleName)
    this.calUkeire = calUkeireRule(ruleName)
  }
}

export {
  RuleSet,
  cal,
  tilesToHand,
  checkHand,
}
