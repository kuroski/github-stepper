import { renderWithDependencies, flushPromises } from "@unit/helpers";
import { githubUserResponse } from "@unit/fixtures";
import axiosMock from "axios";
import { fireEvent } from "@testing-library/vue";
import env from "@/env";
import WorkflowBasicInformation from "@/views/workflow/WorkflowBasicInformation";

jest.mock("axios");

describe("WorkflowBasicInformation", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("submits the basic information form", async () => {
    jest.useFakeTimers();
    const { getByLabelText, getByText } = renderWithDependencies(
      WorkflowBasicInformation
    );

    jest
      .spyOn(axiosMock, "$get")
      .mockImplementationOnce(() => Promise.resolve(githubUserResponse));

    const firstNameInput = getByLabelText("First name (mandatory)");
    const lastNameInput = getByLabelText("Last name (mandatory)");
    const usernameInput = getByLabelText("Github username (mandatory)");
    const submitButton = getByText("Next");

    await fireEvent.update(firstNameInput, "Dave");
    await fireEvent.update(lastNameInput, "Grohl");
    await fireEvent.update(usernameInput, "dave.grohl");
    await fireEvent.keyUp(usernameInput);

    jest.advanceTimersByTime(1000);
    await flushPromises();

    await fireEvent.submit(submitButton);

    expect(document.location.hash).toEqual(
      "#/en/workflow/terms-and-conditions"
    );
    expect(axiosMock.$get).toHaveBeenCalledTimes(1);
    expect(axiosMock.$get).toHaveBeenCalledWith(
      `${env.API_URL}/users/dave.grohl`
    );
  });

  it("displays form validation errors", async () => {
    jest.useFakeTimers();
    const { getByLabelText, getByText } = renderWithDependencies(
      WorkflowBasicInformation
    );

    jest
      .spyOn(axiosMock, "$get")
      .mockImplementationOnce(() => Promise.reject("Invalid user"));

    const usernameInput = getByLabelText("Github username (mandatory)");
    const submitButton = getByText("Next");

    await fireEvent.touch(usernameInput);
    await fireEvent.keyUp(usernameInput);

    jest.advanceTimersByTime(1000);
    await flushPromises();

    await fireEvent.submit(submitButton);

    expect(axiosMock.$get).toHaveBeenCalledTimes(1);
    expect(getByText("The field 'First name' is required")).toBeInTheDocument();
    expect(getByText("The field 'Last name' is required")).toBeInTheDocument();
    expect(
      getByText("The field 'Github username' is required")
    ).toBeInTheDocument();
    expect(
      getByText("The informed Github user doesn't exist")
    ).toBeInTheDocument();
  });
});
