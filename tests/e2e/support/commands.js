// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("performWorkflow", () => {
  cy.server()
    .route("GET", "https://api.github.com/users/**")
    .as("githubRequest");

  cy.get(".btn--primary").click();

  cy.get("#firstName").type("Daniel");
  cy.get("#lastName").type("Kuroski");
  cy.get("#username").type("kuroski");

  cy.wait("@githubRequest")
    .its("status")
    .should("be", 200);

  cy.get(".btn--primary").click();

  cy.get("#email").type("daniel.kuroski@bla.com");
  cy.get("#confirmed").click();

  cy.get(".btn--primary").click();

  cy.get("[data-testid=profile]")
    .should("contain.text", "Daniel Kuroski")
    .and("contain.text", "daniel.kuroski@bla.com");

  cy.get("[data-testid=profile]").should("have.descendants", "img");
  cy.get("[data-testid=profile] a")
    .should("have.attr", "href")
    .and("include", "https://github.com/kuroski");
});
