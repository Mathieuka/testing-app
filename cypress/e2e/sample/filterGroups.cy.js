/// <reference types="cypress" />
import { worker } from "../../../src/msw/browser";

describe('Filter groups', () => {
  beforeEach(async () => {
    Cypress.on('test:before:run:async', async () => {
      await worker.start();
    });   
  })

  it('Login and display filtered groups', () => {
      cy.visit('http://localhost:3000/').then(()=>{
        cy.get("[data-testid=email-input]").type(`some-user@gmail.com`);
        cy.get("[data-testid=login-button]").click();
        cy.wait(2000);

        cy.get("[data-testid=group-element]").should('have.length',80);

        cy.get("[data-testid=Uncategorized]").click();
        cy.get("[data-testid=group-element]").should('have.length',41);
        cy.wait(2000);

        cy.get("[data-testid=Orphaned]").click();
        cy.get("[data-testid=group-element]").should('have.length',39);
        cy.wait(2000);

        cy.get("[data-testid=Inactive]").click();
        cy.get("[data-testid=group-element]").should('have.length',39);
        cy.wait(2000);

        cy.get("[data-testid=Sharing]").click();
        cy.get("[data-testid=group-element]").should('have.length',40);
        cy.wait(2000);

        cy.get("[data-testid=logout-button]").click();
      });
      cy.clearLocalStorage()
  })
})
