describe('status page', () => {
  before(() => {
    cy.visit('/status').get('main').injectAxe()
  })
  it('should show the page', () => {
    cy.get('main').compareSnapshot('status-page', 0.1)
  })
  it('should show a heading', () => {
    cy.contains('h1', 'Status')
  })
  it.skip('Has no detectable a11y violations on load', () => {
    // Test the page at initial load
    cy.checkA11y()
  })
})