/// <reference types="cypress" />

describe('Course Sign-Up Form E2E', () => {
  beforeEach(() => {
    // Visiter la page du formulaire avant chaque test
    cy.visit('/inscription');
  });

  it('should display the sign-up form', () => {
    // Vérifier que le formulaire est affiché
    cy.contains('label', 'Nom').should('be.visible');
    cy.contains('label', 'Prénom').should('be.visible');
    cy.contains('label', 'Email').should('be.visible');
    cy.contains('label', 'Cours').should('be.visible');
    cy.get('input[name="firstName"]').should('be.visible');
    cy.get('input[name="lastName"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('select[name="course"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'S\'inscrire');
  });

  it('should show error when submitting empty form', () => {
    // Soumettre le formulaire vide
    cy.get('button[type="submit"]').click();

    // Vérifier qu'un message d'erreur apparaît
    cy.contains('Veuillez remplir tous les champs correctement').should('be.visible');
  });

  it('should show error for invalid email', () => {
    // Remplir le formulaire avec un email invalide
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('invalid-email');
    
    // Soumettre
    cy.get('button[type="submit"]').click();

    // Vérifier l'erreur (validation HTML5 ou message custom)
    cy.get('input[name="email"]:invalid').should('exist');
  });

  it('should submit valid form successfully', () => {
    // Intercepter la requête HTTP vers le backend
    cy.intercept('POST', 'http://localhost:8080/api/signup/submit', {
      statusCode: 200,
      body: {}
    }).as('submitForm');

    // Remplir le formulaire avec des données valides
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('select[name="course"]').select('Course 1');
    
    // Soumettre
    cy.get('button[type="submit"]').click();

    // Attendre la requête
    cy.wait('@submitForm');

    // Vérifier le message de succès (MatSnackBar)
    cy.contains('Inscription envoyée avec succès').should('be.visible');
  });

  it('should handle server error gracefully', () => {
    // Simuler une erreur serveur
    cy.intercept('POST', 'http://localhost:8080/api/signup/submit', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('submitFormError');

    // Remplir et soumettre
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('select[name="course"]').select('Course 1');
    cy.get('button[type="submit"]').click();

    // Attendre la requête
    cy.wait('@submitFormError');

    // Vérifier le message d'erreur (MatSnackBar)
    cy.contains('Erreur lors de la soumission du formulaire').should('be.visible');
  });

  it('should validate email format with backend', () => {
    // Simuler une réponse 400 du backend (validation échouée)
    cy.intercept('POST', 'http://localhost:8080/api/signup/submit', {
      statusCode: 400,
      body: {
        errors: {
          email: 'Format d\'email invalide'
        }
      }
    }).as('validationError');

    // Remplir avec un email invalide
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('select[name="course"]').select('Course 1');
    cy.get('button[type="submit"]').click();

    // Attendre la réponse
    cy.wait('@validationError');

    // Vérifier qu'une erreur est affichée (MatSnackBar)
    cy.contains(/erreur|error/i).should('be.visible');
  });
});
