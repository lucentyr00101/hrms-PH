/* eslint-disable standard/no-callback-literal */
import { i18nRender } from '@/locales'

export const noWhitespaceAllowed = (rule, value, callback) => {
  const regexp = /^\S*$/
  const valid = regexp.test(value)
  return valid
    ? callback()
    : callback(i18nRender('error.code.invalid'))
}
