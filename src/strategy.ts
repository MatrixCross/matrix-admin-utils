/**
 * 策略模式
 * [状态, 为true时执行的回调函数]
 */
export type StrategyAction = [boolean, () => void]

/**
 * 策略模式
 * @param actions 每一种可能执行的操作
 */
export function exeStrategyActions(actions: StrategyAction[]) {
  actions.some(([flag, action]) => {
    if (flag) {
      action()
    }
    return flag
  })
}
