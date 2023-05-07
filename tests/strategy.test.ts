import { describe, it, expect } from 'vitest'
import { exeStrategyActions } from '../src'


describe('测试Strategy模块', () => {
    it('测试策略模式-1', () => {
        let expectValue
        exeStrategyActions([
            [false, () => { expectValue = 1 }],
            [true, () => { expectValue = 2 }]
        ])
        expect(expectValue).toBe(2)
    })
    it('测试策略模式-2', () => {
        let expectValue
        exeStrategyActions([
            [1 + 1 === 2, () => { expectValue = 1 }],
            [1 + 2 === 3, () => { expectValue = 2 }]
        ])
        expect(expectValue).toBe(1)
    })
})
