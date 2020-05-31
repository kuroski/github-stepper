import { renderWithDependencies } from "@unit/helpers";
import { fireEvent } from "@testing-library/vue";
import WorkflowTerms from "@/views/workflow/WorkflowTerms";

describe("WorkflowTerms", () => {
  it("submits the basic terms form", async () => {
    const { getByLabelText, getByText } = renderWithDependencies(WorkflowTerms);

    const emailInput = getByLabelText("E-mail (mandatory)");
    const confirmedCheckbox = getByLabelText("I agree with terms and services");
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

    expect(getByText("The field 'E-mail' is required")).toBeInTheDocument();

    await fireEvent.update(emailInput, "dave.grohl");

    expect(
      getByText("The field 'E-mail' is with a incorrect format")
    ).toBeInTheDocument();
    expect(
      getByText("You need to accept our terms and conditions")
    ).toBeInTheDocument();
  });
});
