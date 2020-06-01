import { renderWithDependencies } from "@unit/helpers";
import { fireEvent } from "@testing-library/vue";
import WorkflowTerms from "@/views/workflow/WorkflowTerms";

describe("WorkflowTerms", () => {
  it("submits the basic terms form", async () => {
    const { getByLabelText, getByText } = renderWithDependencies(WorkflowTerms);

    const emailInput = getByLabelText("E-mail (mandatory)");
    const confirmedCheckbox = getByText(
      "Do you accept the terms and conditions?"
    );
    const submitButton = getByText("Submit");

    await fireEvent.update(emailInput, "dave.grohl@bla.com");
    await fireEvent.click(confirmedCheckbox);

    await fireEvent.submit(submitButton);

    expect(document.location.hash).toEqual("#/en/workflow/profile");
  });

  it("displays form validation errors", async () => {
    const { getByLabelText, getByText } = renderWithDependencies(WorkflowTerms);

    const emailInput = getByLabelText("E-mail (mandatory)");
    const submitButton = getByText("Submit");

    await fireEvent.submit(submitButton);

    expect(getByText("The field is required")).toBeInTheDocument();

    await fireEvent.update(emailInput, "dave.grohl");

    expect(
      getByText("The field is with a incorrect format")
    ).toBeInTheDocument();
    expect(
      getByText("Do you accept the terms and conditions?")
    ).toBeInTheDocument();
  });
});
