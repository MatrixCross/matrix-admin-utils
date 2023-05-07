import { describe, it, expect } from 'vitest'
import { getIDCardInfo } from '../src'

describe('测试IDCardInfo模块', () => {
    it('测试获取身份证信息', () => {
        expect(getIDCardInfo('123456202305071212')).toStrictEqual({ csny: '2023-05-07', xb: '1' })
        expect(getIDCardInfo('v78yht7388')).toBe(null)
    })
})
