import { describe, it, expect } from 'vitest'
import { aes, des, md5, base64, sha256 } from '../src'

describe('测试Crypto模块', () => {
  it('测试aes加密和解密', () => {
    expect(aes.en('12345')).toBe('UhwFHGMgT4MQ68bde4gjQw==')
    expect(aes.de('UhwFHGMgT4MQ68bde4gjQw')).toBe('12345')
  })
  it('测试des加密和解密', () => {
    expect(des.en('12345')).toBe('KhI+85Ehzfw=')
    expect(des.de('KhI+85Ehzfw=')).toBe('12345')
  })
  it('测试md5', () => {
    expect(md5('12345')).toBe('827ccb0eea8a706c4c34a16891f84e7b')
  })
  it('测试sha256', () => {
    expect(sha256('12345')).toBe('5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5')
  })
  it('测试base64', () => {
    expect(base64.en('你好世界')).toBe('5L2g5aW95LiW55WM')
    expect(base64.de('5L2g5aW95LiW55WM')).toBe('你好世界')
  })
})
