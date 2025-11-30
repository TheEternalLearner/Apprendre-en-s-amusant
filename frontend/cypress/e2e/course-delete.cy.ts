/// <reference types="cypress" />

describe('Course List E2E', () => {
    beforeEach(() => {
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
  });

  it('should remove course from list after deletion', () => {
    cy.intercept('DELETE', 'http://localhost:8080/api/courses/1', {
      statusCode: 200,
      body:{}
    }).as('deleteCourse');
    cy.intercept('GET', 'http://localhost:8080/api/courses', {
        statusCode: 200,
        body: [
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
        }).as('getCoursesAfterDelete');

    cy.contains('Anglais Débutant 6-9 ans').closest('tr').find('[data-cy="delete-course"]').click();
    cy.on('window:confirm', () => true);
    cy.wait('@deleteCourse');

    cy.contains('Anglais Débutant 6-9 ans').should('not.exist');
    cy.contains('Anglais Intermédiaire Adulte').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('tr').should('have.length', 2); // 1 header + 1 course
  });

  it('should not remove course if deletion is cancelled', () => {
    // No need to intercept DELETE since it should not be called

    cy.contains('Anglais Débutant 6-9 ans').closest('tr').find('[data-cy="delete-course"]').click();
    cy.on('window:confirm', () => false);
    cy.wait(500); // wait to ensure no deletion occurs

    cy.contains('Anglais Débutant 6-9 ans').should('be.visible');
    cy.contains('Anglais Intermédiaire Adulte').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('tr').should('have.length', 3); // 1 header + 2 courses
  });

  it('should show error if deleting non-existent course', () => {
    cy.intercept('DELETE', 'http://localhost:8080/api/courses/1', {
      statusCode: 404,
      body: {}
    }).as('deleteNonExistentCourse');

    cy.contains('Anglais Débutant 6-9 ans').closest('tr').find('[data-cy="delete-course"]').click();
    cy.on('window:confirm', () => true);
    cy.wait('@deleteNonExistentCourse');

    cy.contains('Erreur lors de la suppression du cours').should('be.visible');

    cy.contains('Anglais Débutant 6-9 ans').should('be.visible');
    cy.contains('Anglais Intermédiaire Adulte').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('tr').should('have.length', 3); // 1 header + 2 courses
  });

  it('should handle server error gracefully', () => {
    cy.intercept('DELETE', 'http://localhost:8080/api/courses/123', {
      statusCode: 500,
      body: {}
    }).as('deleteCourseError');
    cy.contains('Anglais Débutant 6-9 ans').closest('tr').find('[data-cy="delete-course"]').click();
    cy.on('window:confirm', () => true);
    cy.wait('@deleteCourseError');
    cy.contains("Erreur lors de la suppression du cours").should('be.visible');
    cy.contains('Anglais Débutant 6-9 ans').should('be.visible');
  });

});