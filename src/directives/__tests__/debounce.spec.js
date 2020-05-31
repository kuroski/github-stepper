import { createEvent } from "@unit/helpers";
import debounce from "@/directives/debounce";

describe("directive: debounce", () => {
  it("binds the directive", () => {
    // arrange
    jest.useFakeTimers();

    const fn = jest.fn();
    const element = document.createElement("input");
    debounce.bind(element, { value: fn, arg: 600 });

    // act
    element.dispatchEvent(createEvent("keyup"));
    element.value = "Foo Fighters is awesome!";

    // assert
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(700);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("Foo Fighters is awesome!");
  });

  it("unbinds the directive", () => {
    jest.useFakeTimers();

    const fn = jest.fn();
    const element = document.createElement("input");
    debounce.bind(element, { value: fn, arg: 400 });

    element.dispatchEvent(createEvent("keyup"));
    jest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);

    debounce.unbind(element);

    element.dispatchEvent(createEvent("keyup"));
    jest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
