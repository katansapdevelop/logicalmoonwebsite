describe('Home page', () => {
  before(() => {
    cy.visit('/').get('main').injectAxe()
  })
  it('should show the home page', () => {
    cy.get('main').compareSnapshot('main', 0.1)
  })
  it('should show a heading', () => {
    cy.contains('h1', 'Stake With Logical Moon!')
  })
  it.skip('should have no accessibility violations', () => {
    cy.checkA11y()
  })

  describe.skip('and the copy validator button is clicked', () => {
    before(() => {
      cy.get('.copyButton').click()
    })
    it('should copy address to clipboard', () => {
    });
  })
})