/// <reference types="cypress" />

describe('User Creation form', () => {
    beforeEach(() => {
        cy.visit('/admin/utilisateurs/nouveau');
    })

    it('should display the user creation form', () => {
        cy.contains('label', 'Prénom').should('be.visible');
        cy.contains('label', 'Nom').should('be.visible');
        cy.contains('label', 'Email').should('be.visible');
        cy.contains('label', 'Rôle').should('be.visible');
        cy.contains('label', 'Définir mot de passe').should('be.visible');
        cy.contains('label', 'Téléphone').should('be.visible');
        cy.contains('label', 'Adresse').should('be.visible');
        cy.get('input[name="firstName"]').should('be.visible');
        cy.get('input[name="lastName"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="telephone"]').should('be.visible');
        cy.get('select[name="role"]').should('be.visible');
        cy.get('input[name="address"]').should('be.visible');
        cy.get('button[type="submit"]').should('contain', 'Sauvegarder');
    })

    it('should show error when submitting empty form', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Veuillez remplir tous les champs correctement').should('be.visible');
    })

    it('should submit valid form successfully', () => {
        cy.intercept('POST', 'http://localhost:8080/api/users', {
            statusCode: 200,
            body: {
                id: 9999, 
                firstName: 'Alice',
                lastName: 'Belmont',
                email: 'alice.belmont@example.com',
                role: 'UTILISATEUR',
                password: 'securepassword',
                telephone: '0123456789',
                address: '123 Rue Exemple'
            }
        }).as('userCreate');
        cy.get('input[name="firstName"]').type('Alice');
        cy.get('input[name="lastName"]').type('Belmont');
        cy.get('input[name="email"]').type('alice.belmont@example.com');
        cy.get('select[name="role"]').select('UTILISATEUR');
        cy.get('input[name="password"]').type('securepassword');
        cy.get('input[name="telephone"]').type('0123456789');
        cy.get('input[name="address"]').type('123 Rue Exemple');
        cy.get('button[type="submit"]').click();

        cy.wait('@userCreate').its('response.statusCode').should('eq', 200);
        
        cy.contains('Utilisateur créé avec succès').should('be.visible');
        cy.url().should('include', '/admin/utilisateurs');
    });

    it('should handle server error gracefully', () => {
        cy.intercept('POST', 'http://localhost:8080/api/users', {
            statusCode: 500,
            body: {}
        }).as('userCreateError');
        cy.get('input[name="firstName"]').type('Bob');
        cy.get('input[name="lastName"]').type('Martin');
        cy.get('input[name="email"]').type('bob.martin@example.com');
        cy.get('input[name="password"]').type('anotherpassword');
        cy.get('select[name="role"]').select('UTILISATEUR');
        cy.get('input[name="telephone"]').type('0987654321');
        cy.get('input[name="address"]').type('456 Avenue Exemple');
        cy.get('button[type="submit"]').click();
        cy.wait('@userCreateError');
        cy.contains('Erreur lors de la création de l\'utilisateur').should('be.visible');
    })

})