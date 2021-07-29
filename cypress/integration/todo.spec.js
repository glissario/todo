describe('todo-App', () => {
  beforeEach('xxx', () => {
    cy.intercept('GET', 'http://localhost:4730/todos', {
      statusCode: 200,
      body: [
        {
          id: 1,
          description: 'Learn CSS',
          done: false
        }
      ]
    });
    cy.visit('/');
  });

  it('add task', () => {
    cy.get('[data-test=todo-input]').should('exist').type('test');
    cy.get('[data-test=todo-input]').click();
    cy.get('[data-test=task]').should('exist');
    cy.get('[data-test=task]').contains('Learn CSS');
  });

  it('filter all task', () => {
    cy.get('[data-test=input-radio-all]').click();
    // first of all test all filter with done=false-status:
    cy.get('[data-test=task]').should('exist');
    cy.get('[data-test=task]').should('be.visible');
    cy.get('[data-test=input-radio-done]').click();
    cy.get('[data-test=task]').should('not.be.visible');
    cy.get('[data-test=input-radio-open]').click();
    cy.get('[data-test=task]').should('be.visible');
    // clicking done and test the other status
    cy.get('[data-test=cb-remove]').click();
    cy.get('[data-test=input-radio-all]').click();
    cy.get('[data-test=task]').should('be.visible');
    cy.get('[data-test=input-radio-open]').click();
    cy.get('[data-test=task]').should('not.be.visible');
    cy.get('[data-test=input-radio-done]').click();
    cy.get('[data-test=task]').should('be.visible');
  });

  it('remove done todos', () => {
    cy.get('[data-test=task]').should('exist');
    cy.get('[data-test=cb-remove]').click();
    cy.get('[data-test=rmv-done-button]').click();
    cy.get('[data-test=task]').should('not.exist');
  });
});
