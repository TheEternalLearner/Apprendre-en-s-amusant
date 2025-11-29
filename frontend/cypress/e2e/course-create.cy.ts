/// <reference types="cypress" />

describe('Course Creation Form E2E', () => {
  beforeEach(() => {

    cy.visit('/admin/cours/nouveau');
  });  

  it('should display the course creation form', () => {
    cy.contains('label', 'Intitulé').should('be.visible');
    cy.contains('label', 'Niveau').should('be.visible');
    cy.contains('label', 'Jour').should('be.visible');
    cy.contains('label', 'Horaire').should('be.visible');
    cy.contains('label', 'Lieu').should('be.visible');
    cy.contains('label', 'Capacité').should('be.visible');
    cy.get('input[name="title"]').should('be.visible');
    cy.get('input[name="level"]').should('be.visible');
    cy.get('input[name="dayOfWeek"]').should('be.visible');
    cy.get('input[name="timeSlot"]').should('be.visible');
    cy.get('input[name="location"]').should('be.visible');
    cy.get('input[name="capacity"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Sauvegarder');
  });

  it('should show error when submitting empty form', () => {

    cy.get('button[type="submit"]').click();  
    cy.contains('Veuillez remplir tous les champs correctement').should('be.visible');
  });

  it('should submit valid form successfully', () => {
    cy.intercept('POST', 'http://localhost:8080/api/courses', {
      statusCode: 200,
      body: {
        id: 123,
        title: 'Anglais Débutant 6-9 ans',
        level: 'Débutant',
        dayOfWeek: 'Lundi',
        timeSlot: '10:00-12:00',
        location: 'La Sentinelle',
        capacity: 15
      }
    }).as('submitForm');
    cy.get('input[name="title"]').type('Anglais Débutant 6-9 ans');
    cy.get('input[name="level"]').type('Débutant');
    cy.get('input[name="dayOfWeek"]').type('Lundi');
    cy.get('input[name="timeSlot"]').type('10:00-12:00');
    cy.get('input[name="location"]').type('La Sentinelle');
    cy.get('input[name="capacity"]').type('15');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@submitForm');

    cy.contains('Cours créé avec succès').should('be.visible');
    cy.url().should('include', '/admin/cours');
  });

  it('should handle server error gracefully', () => {
    cy.intercept('POST', 'http://localhost:8080/api/courses', {
      statusCode: 500,
      body: {}
    }).as('submitFormError');
    cy.get('input[name="title"]').type('Anglais Débutant 6-9 ans');
    cy.get('input[name="level"]').type('Débutant');
    cy.get('input[name="dayOfWeek"]').type('Lundi');
    cy.get('input[name="timeSlot"]').type('10:00-12:00');
    cy.get('input[name="location"]').type('La Sentinelle');
    cy.get('input[name="capacity"]').type('15');
    cy.get('button[type="submit"]').click();
    cy.wait('@submitFormError');
    cy.contains('Erreur lors de la création du cours').should('be.visible');
  });
});
