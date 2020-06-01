import { renderWithDependencies } from "@unit/helpers";
import { fireEvent } from "@testing-library/vue";
import TextField from "@/components/TextField";

describe("TextField", () => {
  it("renders a regular input", async () => {
    const { html, getByLabelText, emitted } = renderWithDependencies(
      TextField,
      {
        props: {
          id: "name",
          value: "Hello",
          label: "Name:"
        }
      }
    );

    const nameInput = getByLabelText("Name:");

    await fireEvent.update(nameInput, "Daniel");

    expect(html()).toMatchSnapshot();
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("id", "name");
    expect(emitted().input).toHaveLength(1);
    expect(emitted().input[0][0]).toEqual("Daniel");
  });

  it("displays error messages", () => {
    const { getByText } = renderWithDependencies(TextField, {
      props: {
        id: "name",
        value: "",
        label: "Name:",
        errorMessages: ["Invalid name"]
      }
    });

    expect(getByText("Invalid name")).toBeInTheDocument();
  });

  it("displays progress bar", () => {
    const { getByRole } = renderWithDependencies(TextField, {
      props: {
        id: "name",
        value: "",
        label: "Name:",
        loading: true
      }
    });

    expect(getByRole("progressbar")).toBeInTheDocument();
  });
});
