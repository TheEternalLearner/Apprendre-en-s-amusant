/// <reference types="cypress" />

describe('User List E2E', () => {
    it('should display the list of users', () => {
        cy.intercept('GET', 'http://localhost:8080/api/users', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    firstName: 'Alice',
                    lastName: 'Belmont',
                    email: 'alice.belmont@example.com',
                    password: 'securepassword',
                    role: 'UTILISATEUR',
                    telephone: '0123456789',
                    address: '123 Rue Exemple'
                },
                {
                    id: 2,
                    firstName: 'Bob',
                    lastName: 'Durand',
                    email: 'bob.durand@example.com',
                    role: 'UTILISATEUR',
                }
            ]
        }).as('getUsers');

        cy.visit('/admin/utilisateurs');
        cy.wait('@getUsers');

        cy.contains('Alice Belmont').should('be.visible');
        cy.contains('Bob Durand').should('be.visible');
        cy.get('table').should('be.visible');
        cy.get('tr').should('have.length.at.least', 3); // 1 header + 2 users
    })
})