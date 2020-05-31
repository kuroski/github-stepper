import { renderWithDependencies } from "@unit/helpers";
import WorkflowWizard from "@/components/WorkflowWizard";

describe("WorkflowWizard", () => {
  it("renders a empty list of steps", () => {
    const { html, getByTestId } = renderWithDependencies(WorkflowWizard, {
      props: {
        steps: []
      }
    });

    expect(html()).toMatchSnapshot();
    expect(getByTestId("workflow-wizard")).toBeEmptyDOMElement();
  });
  it("renders a list of steps", () => {
    const routes = [
      {
        path: "/",
        name: "step-1"
      },
      {
        path: "step-2",
        name: "step-2"
      }
    ];

    const { getByText } = renderWithDependencies(WorkflowWizard, {
      routes,
      props: {
        steps: [
          {
            title: "Step 1",
            link: "step-1",
            disabled: false
          },
          {
            title: "Step 2",
            link: "step-2",
            disabled: false
          }
        ]
      }
    });

    const step1 = getByText("Step 1");
    const step2 = getByText("Step 2");

    expect(step1).toBeInTheDocument();
    expect(step1).toHaveAttribute("href", "#/");
    expect(step1).toHaveClass("workflow-wizzard__step--active");

    expect(step2).toBeInTheDocument();
    expect(step2).toHaveAttribute("href", "#step-2");
  });

  it("renders a disabled step", () => {
    const routes = [
      {
        path: "step-1",
        name: "step-1"
      }
    ];

    const { getByText } = renderWithDependencies(WorkflowWizard, {
      routes,
      props: {
        steps: [
          {
            title: "Step 1",
            link: "step-1",
            disabled: true
          }
        ]
      }
    });

    const step1 = getByText("Step 1");

    expect(step1).toBeInTheDocument();
    expect(step1).not.toHaveAttribute("href");
  });
});
