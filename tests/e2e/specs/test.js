// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.findByText("Please choose one workflow format").should("exist");
    cy.contains("h1", "Please choose one workflow format");
  });
});
