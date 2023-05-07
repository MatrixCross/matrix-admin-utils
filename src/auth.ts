import Cookies from 'js-cookie'

let TokenKey = 'Admin-Token'

/**
 * 设置TokenKey值
 */
export function setTokenKey(key: string) {
  TokenKey = key
}

/**
 * 从Cookie获取Token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 设置Token
 */
export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

/**
 * 清除Cookie的Token
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
