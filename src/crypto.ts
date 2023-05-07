import CryptoJS from 'crypto-js'

export interface IKeyInfo {
  key: string
  iv: string
}

let aesKeyInfo = {
  key: '0123456789abcdef', // 密钥, AES-128 需16个字符, AES-256 需要32个字符
  iv: 'abcdef0123456789', // 密钥偏移量，16个字符
}

let desKeyInfo = {
  key: '0123456789abcdef', // 密钥, AES-128 需16个字符, AES-256 需要32个字符
  iv: 'abcdef0123456789', // 密钥偏移量，16个字符
}

let defaultAesMode = CryptoJS.mode.CBC
let defaultAesPadding = CryptoJS.pad.Pkcs7
let defaultDesMode = CryptoJS.mode.CBC
let defaultDesPadding = CryptoJS.pad.Pkcs7

/** 设置aes默认的密钥和偏移量 */
export function setDefaultAesKeyInfo(keyInfo: IKeyInfo) {
  aesKeyInfo = keyInfo
}

/** 设置默认的密钥和偏移量 */
export function setDefaultDesKeyInfo(keyInfo: IKeyInfo) {
  desKeyInfo = keyInfo
}

type Mode = typeof CryptoJS.mode.CBC
type Padding = typeof CryptoJS.pad.Pkcs7

/** 设置默认aes加密模式 */
export function setDefaultAesMode(mode: Mode) {
  defaultAesMode = mode
}

/** 设置默认aes padding模式 */
export function setDefaultAesPadding(padding: Padding) {
  defaultAesPadding = padding
}

/** 设置默认des加密模式 */
export function setDefaultDesMode(mode: Mode) {
  defaultDesMode = mode
}

/** 设置默认des padding模式 */
export function setDefaultDesPadding(padding: Padding) {
  defaultDesPadding = padding
}

/**
 * 加密aes字符串
 */
function encodeAesString(
  data: string,
  {
    key = aesKeyInfo.key,
    iv = aesKeyInfo.iv,
    mode = defaultAesMode,
    padding = defaultAesPadding,
  }: { key: string; iv: string; mode: Mode; padding: Padding } = {
    key: aesKeyInfo.key,
    iv: aesKeyInfo.iv,
    mode: defaultAesMode,
    padding: defaultAesPadding,
  },
) {
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode,
    padding,
  })
  return encrypted.toString() // 返回的是base64格式的密文
}

/**
 * 解密aes字符串
 */
function decodeAesString(
  encrypted: string,
  {
    key = aesKeyInfo.key,
    iv = aesKeyInfo.iv,
    mode = defaultAesMode,
    padding = defaultAesPadding,
  }: { key: string; iv: string; mode: Mode; padding: Padding } = {
    key: aesKeyInfo.key,
    iv: aesKeyInfo.iv,
    mode: defaultAesMode,
    padding: defaultAesPadding,
  },
) {
  const decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode,
    padding,
  })
  return decrypted.toString(CryptoJS.enc.Utf8) // 返回解密后的原文
}

/** AES对称加密解密 */
const aes = {
  en: encodeAesString,
  de: decodeAesString,
}

/** 加密des字符串 */
const encodeDesString = function (
  data: string,
  {
    key = desKeyInfo.key,
    iv = desKeyInfo.iv,
    mode = defaultDesMode,
    padding = defaultDesPadding,
  }: { key: string; iv: string; mode: Mode; padding: Padding } = {
    key: desKeyInfo.key,
    iv: desKeyInfo.iv,
    mode: defaultDesMode,
    padding: defaultDesPadding,
  },
) {
  var encrypted = CryptoJS.DES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode,
    padding,
  })
  return encrypted.toString()
}

/**
 * 解密des字符串
 */
function decodeDesString(
  data: string,
  {
    key = desKeyInfo.key,
    iv = desKeyInfo.iv,
    mode = defaultDesMode,
    padding = defaultDesPadding,
  }: { key: string; iv: string; mode: Mode; padding: Padding } = {
    key: desKeyInfo.key,
    iv: desKeyInfo.iv,
    mode: defaultDesMode,
    padding: defaultDesPadding,
  },
) {
  const decrypted = CryptoJS.DES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode,
    padding,
  })
  return decrypted.toString(CryptoJS.enc.Utf8) // 返回解密后的原文
}

/** Des对称加密解密 */
const des = {
  en: encodeDesString,
  de: decodeDesString,
}

/** BASE64转码 */
const base64 = {
  en: (data: string) => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)),
  de: (data: string) => CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8),
}

/** SHA256摘要 */
const sha256 = (data: string) => {
  return CryptoJS.SHA256(data).toString()
}

/** md5摘要 */
const md5 = (data: string) => {
  return CryptoJS.MD5(data).toString()
}

// 导出可用方法
export { aes, des, md5, sha256, base64, decodeAesString, encodeAesString, decodeDesString, encodeDesString }
