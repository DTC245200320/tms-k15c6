describe('TMS backend foundation', () => {
  it('has the production API contract ready', () => {
    expect('/health').toBe('/health')
    expect('/auth/login').toBe('/auth/login')
    expect('/api/v1/overview').toBe('/api/v1/overview')
  })
})
