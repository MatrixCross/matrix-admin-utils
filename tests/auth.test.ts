import { describe, it, expect } from 'vitest'
import { getToken, setToken, removeToken, setTokenKey } from '../src/auth'

describe('测试Auth模块', () => {
  const token = '123'
  it('测试设置和获取token', () => {
    setToken(token)
    expect(getToken()).toBe(token)
  })
  it('测试设置不同key', () => {
    setTokenKey('test')
    expect(getToken()).toBe(undefined)
  })
  it('恢复成默认key', () => {
    setTokenKey('Admin-Token')
    expect(getToken()).toBe(token)
  })
  it('清除cookie', () => {
    removeToken()
    expect(getToken()).toBe(undefined)
  })
})
