/// <reference types="cypress" />

describe('User Deletion E2E', () => {
    beforeEach( () => {
        cy.intercept('GET', 'http://localhost:8080/api/users', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    firstName: 'Alice',
                    lastName: 'Belmont',
                    email: 'alice.belmont@example.com',
                    role: 'UTILISATEUR',
                    telephone: '0123456789',
                    address: '123 Rue Exemple'
                },
                {
                    id: 2,
                    firstName: 'Bob',
                    lastName: 'Durand',
                    email: 'bob.durand@example.com',
                    role: 'UTILISATEUR'
                }
            ]
        }).as('getUsers');

        cy.visit('/admin/utilisateurs');
        cy.wait('@getUsers');
    });

    it('should remove user from list after deletion', () => {
        cy.intercept('DELETE', 'http://localhost:8080/api/users/1', {
            statusCode: 200,
            body: {}
        }).as('deleteUser');
        cy.intercept('GET', 'http://localhost:8080/api/users', {
            statusCode: 200,
            body:[
                {
                    id: 2,
                    firstName: 'Bob',
                    lastName: 'Durand',
                    email: 'bob.durand@example.com',
                    role: 'UTILISATEUR'
                }
            ]
        }).as('getUsers');
        

        cy.contains('Alice').closest('tr').find('[data-cy="delete-user"]').click();
        cy.on('window:confirm', () => true);
        cy.wait('@deleteUser');
        
        cy.wait('@getUsers');
        cy.contains('Alice').should('not.exist');
        cy.contains('Bob').should('be.visible');
        cy.get('table').should('be.visible');
        cy.get('tr').should('have.length', 2); // 1 header + 1 user
    });

    it('shoul not remove user if deletion is cancelled', () => {
        cy.contains('Alice').closest('tr').find('[data-cy="delete-user"]').click();
        cy.on('window:confirm', () => false);

        cy.wait(500);
        cy.contains('Alice').should('be.visible');
        cy.contains('Bob').should('be.visible');
        cy.get('table').should('be.visible');
        cy.get('tr').should('have.length', 3); // 1 header + 2 users
    });

    it('should show error message if deleting non-existing user', () => {

        // mocking 404 response for example if a double click sends two consectuive deletion for the same user
        cy.intercept('DELETE', 'http://localhost:8080/api/users/1', {
            statusCode: 404,
            body: {}
        }).as('deleteNonExistentUser');

        cy.contains('Alice').closest('tr').find('[data-cy="delete-user"]').click();
        cy.on('window:confirm', () => true);
        cy.wait('@deleteNonExistentUser');

        cy.contains('Erreur lors de la suppression de l\'utilisateur').should('be.visible'); 
        cy.contains('Alice').should('be.visible');
        cy.contains('Bob').should('be.visible');
        cy.get('table').should('be.visible');
        cy.get('tr').should('have.length', 3); // 1 header + 2 users
    })

    it('should handle server error gracefully on deletion', () => {
        cy.intercept('DELETE', 'http://localhost:8080/api/users/1', {
            statusCode: 500,
            body: {}
        }).as('deleteUserError');

        cy.contains('Alice').closest('tr').find('[data-cy="delete-user"]').click();
        cy.on('window:confirm', () => true);
        cy.wait('@deleteUserError');

        cy.contains('Erreur lors de la suppression de l\'utilisateur').should('be.visible');
        cy.contains('Alice').should('be.visible');
        cy.contains('Bob').should('be.visible');
        cy.get('table').should('be.visible');
        cy.get('tr').should('have.length', 3); // 1 header + 2 users
    })
})