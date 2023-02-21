describe('Turing Cafe tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/reservations', { fixture: 'reservations.json' })
    cy.visit('http://localhost:3000')

  })
  it('should have a title', () => {
    cy.contains("Turing Cafe Reservations")
  })
  
  it('should have a form', () => {
    cy.get('Form')
      .get('input[name="name"]')
      .should('be.visible')
    cy.get('Form')
      .get('button')
      .should('be.visible')
  })

  it('should display existing reservations', () => {
    cy.get('.resy-container')
      .get('.ResyTile')
      .contains('Christie')
    cy.get('.resy-container')
      .get('.ResyTile')
      .contains('Number of guests:')
    cy.get('.resy-container')
      .get('.ResyTile')
      .get('button')
      .contains('Cancel')
  })

  it('should have a value of the data input into the forms', () => {
    cy.get('Form')
      .get('input[name="name"]')
      .type('Zac')
      .should('have.value', 'Zac')
    cy.get('Form')
      .get('input[name="date"]')
      .type('5/2')
      .should('have.value', '5/2')
    cy.get('Form')
      .get('input[name="time"]')
      .type('9:00')
      .should('have.value', '9:00')
    cy.get('Form')
      .get('input[name="number"]')
      .type('7')
      .should('have.value', '7')
  })

  it('should be able to make a new reservation', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/reservations', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          name: 'Zac',
          date: '5/2',
          time: '9:00',
          number: 7
        }
      })
    })
    cy.get('Form')
      .get('input[name="name"]')
      .type('Zac')
    cy.get('Form')
      .get('input[name="date"]')
      .type('5/2')
    cy.get('Form')
      .get('input[name="time"]')
      .type('9:00')
    cy.get('Form')
      .get('input[name="number"]')
      .type('7')
    cy.get('Form')
      .find('button')
      .click()
    cy.get('.resy-container')
      .get('.ResyTile')
      .should('contain', 'Zac')
      .and('contain', '5/2')
      .and('contain', '9:00 pm')
      .and('contain', 'Number of guests: 7')

  })
})