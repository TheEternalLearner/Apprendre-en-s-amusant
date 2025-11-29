/// <reference types="cypress" />

describe('Course Sign-Up Form E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/api/courses', [
      { id: 1, title: 'Anglais Débutant 6-9 ans' }
    ]);
    cy.visit('/inscription');
  });

  it('should display the sign-up form', () => {
    cy.contains('label', 'Nom').should('be.visible');
    cy.contains('label', 'Prénom').should('be.visible');
    cy.contains('label', 'Email').should('be.visible');
    cy.contains('label', 'Cours').should('be.visible');
    cy.get('input[name="firstName"]').should('be.visible');
    cy.get('input[name="lastName"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('select[name="courseId"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'S\'inscrire');
  });

  it('should show error when submitting empty form', () => {

    cy.get('button[type="submit"]').click();

    cy.contains('Veuillez remplir tous les champs correctement').should('be.visible');
  });

  it('should show error for invalid email', () => {
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('invalid-email');
    
    cy.get('button[type="submit"]').click();

 
    cy.get('input[name="email"]:invalid').should('exist');
  });

  it('should submit valid form successfully', () => {
    cy.intercept('POST', 'http://localhost:8080/api/signup/submit', {
      statusCode: 200,
      body: {}
    }).as('submitForm');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('select[name="courseId"]').select('1');

    cy.get('button[type="submit"]').click();

    cy.wait('@submitForm');

    cy.contains('Inscription envoyée avec succès').should('be.visible');
  });

  it('should handle server error gracefully', () => {

    cy.intercept('POST', 'http://localhost:8080/api/signup/submit', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('submitFormError');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('select[name="courseId"]').select('1');
    cy.get('button[type="submit"]').click();

    cy.wait('@submitFormError');

    cy.contains('Erreur lors de la soumission du formulaire').should('be.visible');
  });

  it('should validate email format with backend', () => {

    cy.intercept('POST', 'http://localhost:8080/api/signup/submit', {
      statusCode: 400,
      body: {
        errors: {
          email: 'Format d\'email invalide'
        }
      }
    }).as('validationError');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('select[name="courseId"]').select('1');
    cy.get('button[type="submit"]').click();

    cy.wait('@validationError');


    cy.contains(/erreur|error/i).should('be.visible');
  });
});
