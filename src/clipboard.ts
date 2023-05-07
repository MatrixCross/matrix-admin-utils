import Clipboard from 'clipboard'
import { exeStrategyActions } from '.'

let enableDefaultMessage = true
let defaultSuccessCallback: undefined | (() => void)
let defaultErrorCallback: undefined | (() => void)

/**
 * 设置是否调用默认的复制事件回调
 */
export function setClipboardMessageEnable(enable: boolean) {
  enableDefaultMessage = enable
}

/**
 * 设置统一的复制成功回调
 * 比如：
 * ```
 * setDefaultClipboardOnSuccess(() => {
 *     Vue.prototype.$message({
 *       message: '复制成功',
 *       type: 'success',
 *       duration: 1500,
 *     })
 *   }
 * )
 * ```
 */
export function setDefaultClipboardOnSuccess(cb: () => void) {
  defaultSuccessCallback = cb
}

/**
 * 设置统一的复制失败回调
 * 比如：
 * ```
 * setDefaultClipboardOnSuccess(() => {
 *    Vue.prototype.$message({
 *      message: '复制失败',
 *      type: 'error',
 *    })
 *   }
 * )
 * ```
 */
export function setDefaultClipboardOnError(cb: () => void) {
  defaultErrorCallback = cb
}

/**
 * 复制指定文本
 */
export function handleClipboard(text: string, onSuccess?: () => void, onError?: () => void) {
  // 创建一个不可见元素
  const element = document.createElement('button')
  element.style.display = 'none'
  document.body.appendChild(element)
  // 绑定点击复制事件
  const clipboard = new Clipboard(element, {
    text: () => text,
  })

  // 绑定复制事件
  clipboard.on('success', () => {
    exeStrategyActions([
      [!!onSuccess, onSuccess!],
      [enableDefaultMessage, defaultSuccessCallback || (() => {})],
    ])
    clipboard.destroy()
  })

  clipboard.on('error', () => {
    exeStrategyActions([
      [!!onError, onError!],
      [enableDefaultMessage, defaultErrorCallback || (() => {})],
    ])
    clipboard.destroy()
  })

  // 触发复制
  element.click()
  setTimeout(function () {
    document.body.removeChild(element)
  }, 100)
}
