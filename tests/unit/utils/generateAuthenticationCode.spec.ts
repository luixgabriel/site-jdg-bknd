import { generateAuthenticationCode } from '@/utils/authUtils/generateAuthenticationCode'

describe('generateAuthenticationCode', () => {
  it('should generate a code with the correct length', () => {
    const code = generateAuthenticationCode()
    expect(code.toString()).toHaveLength(6)
  })

  it('should generate an integer code', () => {
    const code = generateAuthenticationCode()
    expect(Number.isInteger(code)).toBe(true)
  })

  it('should generate a code within the valid range', () => {
    const code = generateAuthenticationCode()
    expect(code).toBeGreaterThanOrEqual(100000)
    expect(code).toBeLessThanOrEqual(999999)
  })
})
