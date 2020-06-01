import { renderWithDependencies, flushPromises } from "@unit/helpers";
import { fireEvent } from "@testing-library/vue";
import TermsForm from "@/components/TermsForm";

describe("TermsForm", () => {
  it("submits the basic information form", async () => {
    const { getByLabelText, getByText, emitted } = renderWithDependencies(
      TermsForm
    );

    const emailInput = getByLabelText("E-mail (mandatory)");
    const confirmedCheckbox = getByText(
      "Do you accept the terms and conditions?"
    );
    const submitButton = getByText("Submit");

    await fireEvent.update(emailInput, "dave.grohl@bla.com");
    await fireEvent.click(confirmedCheckbox);

    await fireEvent.submit(submitButton);

    expect(emitted().submit[0][0]).toMatchObject({
      email: "dave.grohl@bla.com",
      confirmed: true
    });
  });

  it("displays form validation errors", async () => {
    const { getByLabelText, getByText } = renderWithDependencies(TermsForm);

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
