import { render, fireEvent } from "@testing-library/vue";
import MyButton from "@/components/MyButton";

describe("MyButton", () => {
  it("works", async () => {
    const { getByText, emitted } = render(MyButton, {
      slots: {
        default: "Hello World"
      }
    });

    const button = getByText("Hello World");
    await fireEvent.click(button);

    expect(button).toMatchSnapshot();
    expect(emitted("click")).toMatchSnapshot();
  });
});
