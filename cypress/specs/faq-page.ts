describe('faq page', () => {
  before(() => {
    cy.visit('/projects').get('main').injectAxe()
  })
  it('should show a heading', () => {
    cy.contains('h1', 'FAQ')
  })
  it.skip('should have no accessibility violations', () => {
    cy.checkA11y()
  })
})