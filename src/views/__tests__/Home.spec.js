// import { render } from "@testing-library/vue";
import { renderWithDependencies } from "@unit/helpers";
import Home from "@/views/Home";

describe("Home", () => {
  it("renders workflow links", () => {
    const { getByText } = renderWithDependencies(Home);

    const pagesLink = getByText("Pages");
    const stepperLink = getByText("Stepper");

    expect(pagesLink).toBeInTheDocument();
    expect(stepperLink).toBeInTheDocument();
  });
});
