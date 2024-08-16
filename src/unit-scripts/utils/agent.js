const { Actor, HttpAgent } = require('@dfinity/agent')

/**
 *
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param factory
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./whoami.did.js")._SERVICE>}
 */
const createActor = (canisterId, factory, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions })
  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== 'production') {
    agent.fetchRootKey().catch((err) => {
      console.warn('Unable to fetch root key. Check to ensure that your local replica is running')
      console.error(err)
    })
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(factory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  })
}

module.exports = { createActor }
