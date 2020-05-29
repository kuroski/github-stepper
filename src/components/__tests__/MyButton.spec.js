import { mount } from "@vue/test-utils";
import MyButton from "@/components/MyButton";

describe("MyButton", () => {
  it("works", () => {
    const wrapper = mount(MyButton, {
      slots: {
        default: "Hello World"
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
