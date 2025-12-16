/// <reference types="cypress" />

describe('User Edition E2E', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8080/api/users/1', {
            statusCode: 200,
            body: {
                id: 1,
                firstName: 'Alice',
                lastName: 'Belmont',
                email: 'alice.belmont@example.com',
                password: 'securepassword',
                role: 'USER',
                telephone: '0123456789',
                address: '123 Rue Exemple'
            }
        }).as('getUser');

        cy.visit('/admin/utilisateurs/1/edit');
        cy.wait('@getUser');
    });

    it('should display the course edition form', () => {
        cy.contains('label', 'Prénom').should('be.visible');
        cy.contains('label', 'Nom').should('be.visible');
        cy.contains('label', 'Email').should('be.visible');
        cy.contains('label', 'Rôle').should('be.visible');
        cy.contains('label', 'Définir mot de passe').should('be.visible');
        cy.contains('label', 'Téléphone').should('be.visible');
        cy.contains('label', 'Adresse').should('be.visible');
        cy.get('input[name="firstName"]').should('have.value', 'Alice');
        cy.get('input[name="lastName"]').should('have.value', 'Belmont');
        cy.get('input[name="email"]').should('have.value', 'alice.belmont@example.com');
        cy.get('input[name="telephone"]').should('have.value', '0123456789');
        cy.wait(0); // Delay to ensure select is populated
        cy.get('select[name="role"]').should('have.value', 'USER');
        cy.get('input[name="address"]').should('have.value', '123 Rue Exemple');
        cy.get('button[type="submit"]').should('contain', 'Sauvegarder');
    });

    it('should show error when submitting empty form', () => {
        cy.get('input[name="firstName"]').clear();
        cy.get('input[name="lastName"]').clear();
        cy.get('input[name="email"]').clear();
        cy.get('input[name="telephone"]').clear();
        cy.get('input[name="password"]').clear();
        cy.get('input[name="address"]').clear();
        cy.get('button[type="submit"]').click();
        cy.contains('Veuillez remplir tous les champs correctement').should('be.visible');
    });

    it('should submit valid form successfully', () => {
        cy.intercept('PUT', 'http://localhost:8080/api/users/1', {
            statusCode: 200,
            body: {
                id: 1,
                firstName: 'Alice',
                lastName: 'Durand',
                email: 'alice.durand@example.com',
                password:'newsecurepassword',
                role:'ADMIN',
                telephone: '0987654321',
                address: '456 Rue Exemple'
            }
        }).as('editUser');
        cy.get('input[name="firstName"]').clear().type('Alice');
        cy.get('input[name="lastName"]').clear().type('Durand');
        cy.get('input[name="email"]').clear().type('alice.durand@example.com');
        cy.get('input[name="telephone"]').clear().type('0987654321');
        cy.get('select[name="role"]').select('ADMIN');
        cy.get('input[name="address"]').clear().type('456 Rue Exemple');
        cy.get('input[name="password"]').clear().type('newsecurepassword');
        cy.get('button[type="submit"]').click();
        cy.wait('@editUser');
        cy.contains('Utilisateur modifié avec succès').should('be.visible');
        cy.url().should('include', '/admin/utilisateurs')
    });

    it('should handle server error gracefully', () => {
        cy.intercept('PUT', 'http://localhost:8080/api/users/1', {
            statusCode: 500,
            body: {}
    }).as('editUserError');
        cy.get('input[name="firstName"]').clear().type('Alice');
        cy.get('input[name="lastName"]').clear().type('Durand');
        cy.get('input[name="email"]').clear().type('alice.durand@example.com');
        cy.get('input[name="telephone"]').clear().type('0987654321');
        cy.get('select[name="role"]').select('ADMIN');
        cy.get('input[name="address"]').clear().type('456 Rue Exemple');
        cy.get('input[name="password"]').clear().type('newsecurepassword');
        cy.get('button[type="submit"]').click();
        cy.wait('@editUserError');
        //cy.get('body').should('contain.text', "Erreur lors de l'édition d'utilisateur"); works but a bit generic
        //cy.get('snack-bar-container').contains("Erreur lors de l'édition d'utilisateur").should('be.visible'); does not work
        //cy.contains("Erreur lors de l'édition de l'utilisateur", { timeout: 2000 }).should('be.visible'); does not work for some reason
        cy.get('.cdk-overlay-container').should('contain.text', "Erreur lors de l'édition d'utilisateur");
    });
});
