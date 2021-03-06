describe('About page', () => {
  before(() => {
    cy.visit('/about').get('main').injectAxe()
  })
  it('should show the page', () => {
    cy.get('main').compareSnapshot('about-page', 0.1)
  })
  it('should show a heading', () => {
    cy.contains('h1', 'About Us')
  })
  it.skip('should have no accessibility violations', () => {
    cy.checkA11y()
  })
})