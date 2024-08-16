import { to32bits } from './crypto'
import { sha224 as jsSha224 } from 'js-sha256'
import { getCrc32 } from './crc'
import { toHexString } from '@dfinity/candid/lib/cjs/utils/buffer'
var fs = require('fs')
const { Principal } = require('@dfinity/principal')
function load_canister_id(ids_file_path) {
  var res
  data = fs.readFileSync(ids_file_path, 'utf8')
  res = JSON.parse(data)
  return res
}

function json_stringify(data) {
  let res = JSON.stringify(data, (key, value) => {
    // console.log(key, value);
    if (typeof value === 'bigint') {
      return value.toString() + 'n'
    } else if (value._isPrincipal) {
      return 'Principal:' + value.toText()
    } else {
      return value
    }
  })
  return res
}

function json_parse(s) {
  let data = JSON.parse(s, (key, value) => {
    // console.log("key ", key, "value", value);
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
      return BigInt(value.substring(0, value.length - 1))
    } else if (typeof value === 'string' && value.startsWith('Principal:')) {
      return Principal.fromText(value.substring(10))
    } else {
      return value
    }
  })
  return data
}
function sha224(data) {
  const shaObj = jsSha224.create()
  shaObj.update(data)
  return new Uint8Array(shaObj.array())
}

const getSubAccountArray = (s) => {
  sha224
  if (Array.isArray(s)) {
    return s.concat(Array(32 - s.length).fill(0))
  } else {
    //32 bit number only
    return Array(28)
      .fill(0)
      .concat(to32bits(s ? s : 0))
  }
}

export const principalToAccountIdentifier = (p, s) => {
  const padding = new Buffer('\x0Aaccount-id')
  const array = new Uint8Array([...padding, ...Principal.fromText(p).toUint8Array(), ...getSubAccountArray(s)])
  const hash = sha224(array)
  const checksum = to32bits(getCrc32(hash))
  const array2 = new Uint8Array([...checksum, ...hash])
  return toHexString(array2)
}
module.exports = { principalToAccountIdentifier, load_canister_id, json_parse, json_stringify }
