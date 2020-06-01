describe("Workflow with pages example", () => {
  it("Performs a full workflow with success", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/en");

    cy.get("[data-testid=pages-button]").click();
    cy.performWorkflow();
  });
});
