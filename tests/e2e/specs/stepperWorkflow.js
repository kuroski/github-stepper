describe("Workflow with stepper example", () => {
  it("Performs a full workflow with success", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/en");

    cy.get("[data-testid=stepper-button]").click();
    cy.performWorkflow();
  });
});
