import { renderWithDependencies, flushPromises } from "@unit/helpers";
import { githubUserResponse } from "@unit/fixtures";
import axiosMock from "axios";
import { fireEvent } from "@testing-library/vue";
import env from "@/env";
import BasicInformationForm from "@/components/BasicInformationForm";

jest.mock("axios");

describe("BasicInformationForm", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("submits the basic information form", async () => {
    jest.useFakeTimers();
    const { getByLabelText, getByText, emitted } = renderWithDependencies(
      BasicInformationForm
    );

    jest
      .spyOn(axiosMock, "$get")
      .mockImplementationOnce(() => Promise.resolve(githubUserResponse));

    const firstNameInput = getByLabelText("First name (mandatory)");
    const lastNameInput = getByLabelText("Last name (mandatory)");
    const usernameInput = getByLabelText("Github username (mandatory)");
    const submitButton = getByText("Submit");

    await fireEvent.update(firstNameInput, "Dave");
    await fireEvent.update(lastNameInput, "Grohl");
    await fireEvent.update(usernameInput, "dave.grohl");
    await fireEvent.keyUp(usernameInput);

    jest.advanceTimersByTime(1000);
    await flushPromises();

    await fireEvent.submit(submitButton);

    expect(emitted().submit[0][0]).toMatchObject({
      firstName: "Dave",
      lastName: "Grohl",
      username: "dave.grohl",
      github: {
        id: githubUserResponse.id,
        login: githubUserResponse.login,
        email: githubUserResponse.email,
        avatarUrl: githubUserResponse.avatar_url,
        htmlUrl: githubUserResponse.html_url
      }
    });
    expect(axiosMock.$get).toHaveBeenCalledTimes(1);
    expect(axiosMock.$get).toHaveBeenCalledWith(
      `${env.API_URL}/users/dave.grohl`
    );
  });

  it("displays form validation errors", async () => {
    jest.useFakeTimers();
    const { getByLabelText, getByText, getAllByText } = renderWithDependencies(
      BasicInformationForm
    );

    jest
      .spyOn(axiosMock, "$get")
      .mockImplementationOnce(() => Promise.reject("Invalid user"));

    const usernameInput = getByLabelText("Github username (mandatory)");
    const submitButton = getByText("Submit");

    await fireEvent.touch(usernameInput);
    await fireEvent.keyUp(usernameInput);

    jest.advanceTimersByTime(1000);
    await flushPromises();

    await fireEvent.submit(submitButton);

    const formErrors = getAllByText("The field is required");

    expect(axiosMock.$get).toHaveBeenCalledTimes(1);
    expect(formErrors).toHaveLength(3);
    formErrors.forEach(element => expect(element).toBeInTheDocument());
    expect(
      getByText("The informed Github user doesn't exist")
    ).toBeInTheDocument();
  });
});
