const { Ed25519KeyIdentity } = require('@dfinity/identity')
const { Principal } = require('@dfinity/principal')

async function main() {
  const identity = Ed25519KeyIdentity.generate()

  const principal = identity.getPrincipal()
  const publicKey = identity.getPublicKey().toDer()

  const order = {
    orderId: '12345',
    amount: 1000,
    timestamp: Date.now(),
    principal: principal.toText(),
    publicKey: publicKey,
  }

  const signContent = {
    order,
    principal: principal.toText(),
    publicKey: publicKey,
  }

  const signContentString = JSON.stringify(signContent)
  const signature = await identity.sign(new TextEncoder().encode(signContentString))

  console.log(signature)
}

main()
