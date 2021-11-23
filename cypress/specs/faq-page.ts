describe('faq page', () => {
  before(() => {
    cy.visit('/projects').get('main').wait(2000).injectAxe()
  })
  it('should show the page', () => {
    cy.get('main').compareSnapshot('faq-page', 0.1)
  })
  it('should show a heading', () => {
    cy.contains('h1', 'FAQ')
  })
  it.skip('should have no accessibility violations', () => {
    cy.checkA11y()
  })
})