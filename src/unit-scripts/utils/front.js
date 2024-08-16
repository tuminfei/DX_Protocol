import { Principal } from '@dfinity/principal'

function dq(a, b) {
  return a !== undefined && a !== null ? a : b
}

function fromHexString(hexString) {
  new Uint8Array(dq(hexString.match(/.{1,2}/g), []).map((byte) => parseInt(byte, 16)))
}

function toHexString(bytes) {
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '')
}

function to32bits(num) {
  let b = new ArrayBuffer(4)
  new DataView(b).setUint32(0, num)
  return Array.from(new Uint8Array(b))
}

function from32bits(ba) {
  let value = 0
  for (let i = 0; i < 4; i++) {
    value = (value << 8) | ba[i]
  }
  return value
}

const padding = new Buffer.from('\x0Atid')

function tokenIdentifier(principal, index) {
  const array = new Uint8Array([...padding, ...Principal.fromText(principal).toUint8Array(), ...to32bits(index)])
  return Principal.fromUint8Array(array).toText()
}

module.exports = { fromHexString, toHexString, to32bits, from32bits, tokenIdentifier }
