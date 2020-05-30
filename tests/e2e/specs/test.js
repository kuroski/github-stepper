// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.findByText("hello i18n !!").should("exist");
    cy.contains("h1", "hello i18n !!");
  });
});
