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
        if (Cypress.config('baseUrl') === "http://localhost:8000/"){
          cy.wait(1000).get('.header-link[href="https://radixlogicalmoon.gitbook.io/radix-logical-moon-docs/"]').click()
        }
      })
      it('should go to to the docs site', () => {
        if (Cypress.config('baseUrl') === "http://localhost:8000/"){
        cy.contains('span', 'Radix Logical Moon Docs')
        }
        else{
          cy.log('Test skipped for remote')
        }
      })
    })
  

    describe('and faq page link is selected', () => {
      before(() => {
        //cy.wait(1000).get('.header-link[href="/projects/"]').click()
      })
      it.skip('should show a new heading', () => {
        cy.contains('h1', 'FAQ')
      })
    })
  })
})