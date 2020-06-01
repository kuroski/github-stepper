import { renderWithDependencies } from "@unit/helpers";
import { fireEvent } from "@testing-library/vue";
import Checkbox from "@/components/Checkbox";

describe("Checkbox", () => {
  it("renders a regular input", async () => {
    const { html, getByLabelText, emitted } = renderWithDependencies(Checkbox, {
      props: {
        id: "terms",
        value: false,
        label: "Do you aceept our terms?"
      }
    });

    const checkboxInput = getByLabelText("Do you aceept our terms?");

    await fireEvent.click(checkboxInput);

    expect(html()).toMatchSnapshot();
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toHaveAttribute("id", "terms");
    expect(emitted().input).toHaveLength(1);
    expect(emitted().input[0][0]).toEqual(true);
  });

  it("displays error messages", () => {
    const { getByText } = renderWithDependencies(Checkbox, {
      props: {
        id: "terms",
        value: "",
        label: "Do you aceept our terms?",
        errorMessages: ["This field is required"]
      }
    });

    expect(getByText("This field is required")).toBeInTheDocument();
  });
});
