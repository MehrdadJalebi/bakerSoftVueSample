describe('Test', function () {
  it('running successfully', () => {
    // Making sure it runs successfully
    
    // Visit page url
    cy.visit('http://localhost:8080')


    //making share header is visible
    cy.get('.header')
      .should('be.visible')
   
    cy.wait(2000)
    
    //making share table is visible
    cy.get('#dataTable')
      .should('be.visible')
    
    cy.get('td:first-child')
      .should('be.visible')

    //making share filters is working ***************
    
    //filling the input
    cy.get('input#seriesIdFilter')
      .type('top-gear')
      .should('have.value', 'top-gear')


    // check filter button exists
    cy.get('button').
      invoke('width')
      .should('be.gt', 0)
    cy.wait(1000)

     // Click on filter button
    cy.get('button')
      .click()

    cy.wait(3000)

    cy.get('td:first-child')
    .should('contain', 'top-gear')

  })

})
