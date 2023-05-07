/** 出生年月日和性别 */
export interface IDCardInfo {
  /** 出生年月日 */
  csny: string
  /** 性别 */
  xb: string
}

/**
 * 获取身份证的生日和性别
 */
export function getIDCardInfo(sfz: string): IDCardInfo | null {
  if (sfz.length == 18) {
    const info = sfz.replace(/\w{6}(\w{4})(\w{2})(\w{2})\w{2}(\w{1}).*/gi, '$1-$2-$3,$4')
    const infoArr = info.split(',')
    const csny = infoArr[0]
    const xb = (Number(infoArr[1]) % 2) + ''
    return { csny: csny, xb: xb }
  } else {
    return null
  }
}
