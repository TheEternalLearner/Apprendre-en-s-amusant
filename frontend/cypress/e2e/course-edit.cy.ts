/// <reference types="cypress" />

describe('Course Creation Form E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/api/courses/123', {
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
    }).as('getCourse');
    cy.visit('/admin/cours/123/edit');
    cy.wait('@getCourse');
  });

  it('should display the course creation form', () => {
    cy.contains('label', 'Intitulé').should('be.visible');
    cy.get('input[name="title"]').should('have.value', 'Anglais Débutant 6-9 ans');
    cy.get('input[name="level"]').should('have.value', 'Débutant');
    cy.get('input[name="dayOfWeek"]').should('have.value', 'Lundi');
    cy.get('input[name="timeSlot"]').should('have.value', '10:00-12:00');
    cy.get('input[name="location"]').should('have.value', 'La Sentinelle');
    cy.get('input[name="capacity"]').should('have.value', '15');
    cy.get('button[type="submit"]').should('contain', 'Sauvegarder');
  });

  it('should show error when submitting empty form', () => {

    cy.get('button[type="submit"]').click();  
    cy.contains('Veuillez remplir tous les champs correctement').should('be.visible');
  });

  it('should submit valid form successfully', () => {
    cy.intercept('PUT', 'http://localhost:8080/api/courses/123', {
      statusCode: 200,
      body: {
        id: 123,
        title: 'Anglais Intermédiaire 10-12 ans',
        level: 'Intermédiaire',
        dayOfWeek: 'Mardi',
        timeSlot: '14:00-16:00',
        location: 'Visio',
        capacity: 12
      }
    }).as('editCourse');
    cy.get('input[name="title"]').clear().type('Anglais Intermédiaire 10-12 ans');
    cy.get('input[name="level"]').clear().type('Intermédiaire');
    cy.get('input[name="dayOfWeek"]').clear().type('Mardi');
    cy.get('input[name="timeSlot"]').clear().type('14:00-16:00');
    cy.get('input[name="location"]').clear().type('Visio');
    cy.get('input[name="capacity"]').clear().type('12');
    cy.get('button[type="submit"]').click();
    cy.wait('@editCourse');
    cy.contains('Cours modifié avec succès').should('be.visible');
    cy.url().should('include', '/admin/cours');
  });

  it('should handle server error gracefully', () => {
    cy.intercept('PUT', 'http://localhost:8080/api/courses/123', {
      statusCode: 500,
      body: {}
    }).as('editCourseError');
    cy.get('input[name="title"]').clear().type('Anglais Débutant 6-9 ans');
    cy.get('input[name="level"]').clear().type('Débutant');
    cy.get('input[name="dayOfWeek"]').clear().type('Lundi');
    cy.get('input[name="timeSlot"]').clear().type('10:00-12:00');
    cy.get('input[name="location"]').clear().type('La Sentinelle');
    cy.get('input[name="capacity"]').clear().type('15');
    cy.get('button[type="submit"]').click();
    cy.wait('@editCourseError');
    cy.contains("Erreur lors de l'édition du cours").should('be.visible');
  });
});