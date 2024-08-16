import { createActor } from './declarations/ledger/index'
import { getAccountCredentials } from './crypto'

function getActor(mnemonic, subAccount) {
  const identity = getAccountCredentials(mnemonic, subAccount)
  createActor()
}
