// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { handleClipboard, setClipboardMessageEnable } from '../src/clipboard'
type TargetGenericTypeRemoveReadonly<S> = {
  -readonly [key in keyof S]: S[key]
}
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
describe('测试ClipBoard模块', () => {
  it('测试复制', async () => {
    // 复制内容
    const text = '123'
    setClipboardMessageEnable(false)
    // 模拟复制事件
    const event = new Event('paste', {
      bubbles: true,
      cancelable: true,
    }) as DeepPartial<TargetGenericTypeRemoveReadonly<ClipboardEvent>>
    event.clipboardData = {
      getData() {
        return text
      },
    }

    let pasteText
    addEventListener('paste', (res) => {
      pasteText = res.clipboardData?.getData('')
    })
    handleClipboard(text)
    // todo: 实际上jsdom没有document.execCommand，这里只能简单mock一下
    document.dispatchEvent(event as unknown as ClipboardEvent)

    expect(pasteText).toBe(text)
  })
})
