import { renderWithDependencies } from "@unit/helpers";
import LocalizedLink from "@/components/LocalizedLink";

describe("LocalizedLink", () => {
  it("renders a router-link with current system locale", () => {
    const { getByText } = renderWithDependencies(LocalizedLink, {
      props: {
        to: { name: "home" }
      },
      slots: {
        default: "My link"
      }
    });

    const link = getByText("My link");
    expect(link).toMatchSnapshot();
    expect(link).toHaveAttribute("href", "#/en/");
  });
});
