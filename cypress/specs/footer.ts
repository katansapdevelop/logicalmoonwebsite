describe('Footer', () => {
  describe('when visiting home page', () => {
    before(() => {
      cy.visit('/').get('footer').injectAxe()
    })
    it.skip('should have no accessibility violations', () => {
      cy.checkA11y()
    })

    describe.skip('and the twitter link is clicked', () => {
      before(() => {
        // https://testersdock.com/cypress-new-window/
        cy.get('a[href="https://twitter.com/radixlogical"]').invoke('removeAttr', 'target').click()
      })
      it('should open ', () => {
        cy.url().should('include', 'https://twitter.com/radixlogical')
      })
    })
  })
})