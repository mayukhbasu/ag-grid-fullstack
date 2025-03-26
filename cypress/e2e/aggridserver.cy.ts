describe('AgGrid Server-Side Component', () => {

  beforeEach(() => {
    // Replace URL with your actual route to this component
    cy.visit('/');
  });

  it('should load the ag-grid and display initial rows', () => {
    // Verify the grid exists
    cy.get('ag-grid-angular').should('exist');

    // Verify initial rows are loaded (server-side fetch)
    cy.get('.ag-center-cols-container .ag-row')
      .should('have.length.greaterThan', 0);
  });

  it('should perform search and update grid results', () => {
    const searchQuery = 'John';

    // Enter search query
    cy.get('input[placeholder="Search Users..."]').clear().type(searchQuery);

    // Click the search button
    cy.contains('button', 'Search').click();

    // Verify rows updated after search
    cy.get('.ag-center-cols-container .ag-row')
      .should('have.length.greaterThan', 0)
      .first()
      .should('contain.text', searchQuery);
  });

  it('should open user details dialog on username click', () => {
    // Click on the first username cell
    cy.get('.ag-center-cols-container .ag-row .hover-underline').first().click();

    // Verify dialog opened
    cy.get('mat-dialog-container')
      .should('exist')
      .and('be.visible');
  });
});
