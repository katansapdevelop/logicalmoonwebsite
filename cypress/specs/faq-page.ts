describe('faq page', () => {
  before(() => {
    //cy.visit('/projects').get('main').injectAxe()
  })
  it.skip('should show the page', () => {
    cy.get('main').compareSnapshot('faq-page', 0.1)
  })
  it.skip('should show a heading', () => {
    cy.contains('h1', 'FAQ')
  })
  it.skip('should have no accessibility violations', () => {
    cy.checkA11y()
  })
})