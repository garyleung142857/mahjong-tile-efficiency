import { calShantenRule, cal, setHandLength } from './src/CalShanten.js'
import { tilesToHand } from './src/Helper.js'
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
  setHandLength,
  tilesToHand
}
