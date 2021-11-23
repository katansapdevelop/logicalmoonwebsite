describe('Header', () => {
  describe('when visiting home page', () => {
    before(() => {
      cy.visit('/').get('header').injectAxe()
    })
    it('should show the header', () => {
      cy.get('header').compareSnapshot('header', 0.1)
    })
    it.skip('should have no accessibility violations', () => {
      cy.checkA11y()
    })

    describe('and about page link is selected', () => {
      before(() => {
        cy.wait(1000).get('.header-link[href="/about/"]').click()
      })
      it('should show a heading', () => {
        cy.contains('h1', 'About Us')
      })
    })

    describe('and faq page link is selected', () => {
      before(() => {
        cy.wait(1000).get('.header-link[href="/projects/"]').click()
      })
      it('should show a new heading', () => {
        cy.contains('h1', 'FAQ')
      })
    })
  })
})