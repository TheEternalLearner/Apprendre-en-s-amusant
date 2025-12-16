/// <reference types="cypress" />

describe('Course List E2E', () => {
  it('should display the list of courses', () => {
    cy.intercept('GET', 'http://localhost:8080/api/courses', {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'Anglais Débutant 6-9 ans',
          level: 'Débutant',
          dayOfWeek: 'Lundi',
          timeSlot: '10:00-12:00',
          location: 'La Sentinelle',
          capacity: 15
        },
        {
          id: 2,
          title: 'Anglais Intermédiaire Adulte',
          level: 'Intermédiaire',
          dayOfWeek: 'Mardi',
          timeSlot: '14:00-16:00',
          location: 'Visio',
          capacity: 12
        }
      ]
    }).as('getCourses');

    cy.visit('/admin/cours');
    cy.wait('@getCourses');

    cy.contains('Anglais Débutant 6-9 ans').should('be.visible');
    cy.contains('Anglais Intermédiaire Adulte').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('tr').should('have.length.at.least', 3); // 1 header + 2 courses
  });
});
